import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(PROJECT_ROOT, 'content');
const PUBLIC_ROOT = join(PROJECT_ROOT, 'public');

const LOCALES = ['es', 'en'];
const LATIN1_DECODED_AS_UTF8 = /[ÃÂ]\s*[-¿]|â€/;
const EXPECTED_CHARACTERS = ['ñ', 'á', 'é', 'í', 'ó', 'ú', '—', '·'];
const OG_DESCRIPTION_MAX_LENGTH = 200;
const SUMMARY_MIN_LENGTH = 40;
const EXPECTED_GENERATED_MEDIA_COUNT = 1;

const failures = [];

function fail(message) {
  failures.push(message);
}

function readContent(fileName) {
  return JSON.parse(readFileSync(join(CONTENT_DIR, fileName), 'utf8'));
}

const mediaManifest = JSON.parse(readFileSync(join(CONTENT_DIR, '_media.json'), 'utf8'));

const DOCUMENT_EXTENSIONS = new Set(['.pdf']);

function assetExists(publicPath) {
  const relativePath = publicPath.replace(/^\//, '');
  if (!existsSync(join(PUBLIC_ROOT, relativePath))) return false;

  const isDocument = [...DOCUMENT_EXTENSIONS].some((extension) => publicPath.endsWith(extension));
  if (isDocument) return true;

  if (!mediaManifest[publicPath]) {
    fail(`${publicPath}: ausente en content/_media.json, ejecutar media:build`);
    return false;
  }

  return true;
}

function checkCharset(label, payload) {
  const serialized = JSON.stringify(payload);
  if (LATIN1_DECODED_AS_UTF8.test(serialized)) {
    fail(`${label}: mojibake detectado`);
  }
}

function checkLocalizedField(label, value) {
  if (value === null || value === undefined) return;

  for (const locale of LOCALES) {
    const localizedValue = value[locale];

    if (localizedValue === undefined) {
      fail(`${label}: falta la locale "${locale}"`);
      continue;
    }

    if (typeof localizedValue === 'string' && localizedValue.trim().length === 0) {
      fail(`${label}.${locale}: cadena vacia`);
    }

    if (Array.isArray(localizedValue) && localizedValue.length === 0) {
      fail(`${label}.${locale}: lista vacia`);
    }
  }

  const [first, second] = LOCALES.map((locale) => value[locale]);
  if (Array.isArray(first) && Array.isArray(second) && first.length !== second.length) {
    fail(`${label}: ${first.length} entradas en es contra ${second.length} en en`);
  }
}

function checkUniqueness(label, values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) fail(`${label}: valor duplicado "${value}"`);
    seen.add(value);
  }
}

function validateProjects(projects, skillIds) {
  checkUniqueness('projects.slug', projects.map((project) => project.slug));
  checkUniqueness('projects.order', projects.map((project) => project.order));

  let generatedMediaCount = 0;

  for (const project of projects) {
    const label = `projects[${project.slug}]`;

    checkLocalizedField(`${label}.role`, project.role);
    checkLocalizedField(`${label}.summary`, project.summary);
    checkLocalizedField(`${label}.body`, project.body);
    checkLocalizedField(`${label}.displayNameOverride`, project.displayNameOverride);

    for (const locale of LOCALES) {
      const summary = project.summary?.[locale] ?? '';
      if (summary.length < SUMMARY_MIN_LENGTH || summary.length > OG_DESCRIPTION_MAX_LENGTH) {
        fail(`${label}.summary.${locale}: ${summary.length} caracteres, fuera de ${SUMMARY_MIN_LENGTH}-${OG_DESCRIPTION_MAX_LENGTH}`);
      }
    }

    if (project.stack.length === 0) fail(`${label}.stack: vacio`);

    for (const skillId of project.stack) {
      if (!skillIds.has(skillId)) fail(`${label}.stack: skill inexistente "${skillId}"`);
    }

    if (project.url !== null && !project.url.startsWith('https://')) {
      fail(`${label}.url: no es https`);
    }

    if (project.media.kind === 'generated') {
      generatedMediaCount += 1;
    } else {
      for (const key of ['logo', 'desktopImage', 'mobileImage']) {
        const path = project.media[key];
        if (path === null && key === 'logo') continue;
        if (!assetExists(path)) fail(`${label}.media.${key}: archivo inexistente "${path}"`);
      }
      checkLocalizedField(`${label}.media.alt`, project.media.alt);
    }
  }

  if (generatedMediaCount !== EXPECTED_GENERATED_MEDIA_COUNT) {
    fail(`projects: ${generatedMediaCount} con media generada, se esperaban ${EXPECTED_GENERATED_MEDIA_COUNT}`);
  }
}

function validateExperience(experience, skillIds) {
  checkUniqueness('experience.id', experience.map((entry) => entry.id));

  for (const entry of experience) {
    const label = `experience[${entry.id}]`;
    checkLocalizedField(`${label}.role`, entry.role);
    checkLocalizedField(`${label}.location`, entry.location);
    checkLocalizedField(`${label}.highlights`, entry.highlights);

    if (entry.end !== null && entry.end < entry.start) {
      fail(`${label}: end "${entry.end}" anterior a start "${entry.start}"`);
    }

    for (const skillId of entry.stack) {
      if (!skillIds.has(skillId)) fail(`${label}.stack: skill inexistente "${skillId}"`);
    }
  }
}

function validateCredentials(credentials) {
  checkUniqueness('credentials.id', credentials.map((entry) => entry.id));

  for (const entry of credentials) {
    const label = `credentials[${entry.id}]`;
    checkLocalizedField(`${label}.title`, entry.title);
    checkLocalizedField(`${label}.subtitle`, entry.subtitle);

    if (entry.credentialUrl !== null && !entry.credentialUrl.startsWith('https://')) {
      fail(`${label}.credentialUrl: no es https`);
    }
  }
}

function validateSkills(skills) {
  checkUniqueness('skills.id', skills.map((skill) => skill.id));

  for (const skill of skills) {
    if (skill.icon !== null && !assetExists(skill.icon)) {
      fail(`skills[${skill.id}].icon: archivo inexistente "${skill.icon}"`);
    }
  }
}

function validateServices(services) {
  checkUniqueness('services.slug', services.map((service) => service.slug));

  for (const service of services) {
    const label = `services[${service.slug}]`;
    checkLocalizedField(`${label}.title`, service.title);
    checkLocalizedField(`${label}.description`, service.description);
    if (!assetExists(service.image)) fail(`${label}.image: archivo inexistente "${service.image}"`);
  }
}

function validateGoals(goals) {
  checkUniqueness('goals.id', goals.map((goal) => goal.id));
  for (const goal of goals) checkLocalizedField(`goals[${goal.id}].text`, goal.text);
}

function validateSocial(social) {
  checkUniqueness('social.id', social.map((link) => link.id));

  for (const link of social) {
    const isWebLink = link.url.startsWith('https://');
    const isMailLink = link.url.startsWith('mailto:');
    if (!isWebLink && !isMailLink) fail(`social[${link.id}].url: protocolo no permitido`);
  }
}

function validateProfile(profile) {
  for (const field of ['greeting', 'headline', 'summary', 'bio', 'expertiseIntro', 'location', 'availability']) {
    checkLocalizedField(`profile.${field}`, profile[field]);
  }

  if (!assetExists(profile.image)) fail(`profile.image: archivo inexistente "${profile.image}"`);

  for (const locale of LOCALES) {
    const resume = profile.cv?.[locale];

    if (!resume) {
      fail(`profile.cv.${locale}: falta el documento`);
      continue;
    }

    if (!assetExists(resume.href)) {
      fail(`profile.cv.${locale}.href: archivo inexistente "${resume.href}"`);
    }

    if (!LOCALES.includes(resume.language)) {
      fail(`profile.cv.${locale}.language: idioma desconocido "${resume.language}"`);
    }
  }
}

function validateCharsetIntegrity(collections) {
  const serialized = JSON.stringify(collections);
  const missing = EXPECTED_CHARACTERS.filter((character) => !serialized.includes(character));
  if (missing.length > 0) fail(`charset: caracteres ausentes en el contenido: ${missing.join(' ')}`);
}

function validate() {
  const projects = readContent('projects.json');
  const experience = readContent('experience.json');
  const credentials = readContent('credentials.json');
  const skills = readContent('skills.json');
  const services = readContent('services.json');
  const goals = readContent('goals.json');
  const social = readContent('social.json');
  const profile = readContent('profile.json');

  const collections = { projects, experience, credentials, skills, services, goals, social, profile };
  const skillIds = new Set(skills.map((skill) => skill.id));

  for (const [name, payload] of Object.entries(collections)) checkCharset(name, payload);

  validateProjects(projects, skillIds);
  validateExperience(experience, skillIds);
  validateCredentials(credentials);
  validateSkills(skills);
  validateServices(services);
  validateGoals(goals);
  validateSocial(social);
  validateProfile(profile);
  validateCharsetIntegrity(collections);

  const summary = [
    `${projects.length} projects`,
    `${experience.length} experience`,
    `${credentials.length} credentials`,
    `${skills.length} skills`,
    `${services.length} services`,
    `${goals.length} goals`,
    `${social.length} social`,
  ].join(' · ');

  if (failures.length > 0) {
    console.error(`\nValidacion fallida con ${failures.length} problemas:\n`);
    for (const failure of failures) console.error(`  ${failure}`);
    process.exit(1);
  }

  console.log(summary);
  console.log('Charset verificado: sin mojibake, acentos y guiones largos presentes.');
  console.log('Integridad referencial verificada: stack, assets y locales completos.');
}

validate();
