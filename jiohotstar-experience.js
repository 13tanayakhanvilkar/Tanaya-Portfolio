const jioHotstarExperience = {
  platform: {
    theme: 'platform',
    eyebrow: 'JioHotstar / Platform Marketing <br><br> Jun\'26 - Present',
    title: 'Platform Marketing',
    subtitle: 'Entertainment &middot; Originals &middot; Movies &middot; Reality Shows',
    description: 'Worked in the Platform Marketing team, contributing to campaign execution, content promotion, audience engagement and launch strategies for premium entertainment properties.',
    tags: ['Content Marketing', 'Campaign Launches', 'CRM', 'Viewer Engagement', 'Personalization', 'Performance Tracking', 'Campaign Analytics'],
    buttonText: 'View Case Study',
    route: 'PlatformMarketing.html',
    media: {
      backgroundImage: 'Photos/Platform_marketing_Logo.png',
      contentImages: []
    }
  },
 sports: {
  theme: 'sports',
  eyebrow: 'JioHotstar / Sports Marketing <br><br> Jan\'26 - Jun\'26',
  title: 'Ad Operations',
  subtitle: "IPL &middot; ICC Men's Cricket World Cup",
  description: 'Managed high-stakes digital ad operations for premier events like IPL and the ICC Cricket World Cup at JioHotstar. Specialized in campaign delivery, pacing optimization, ad tech QA automation, and cross-functional ad execution for top-tier brands.',
  tags: ['Ad Operations', 'Campaign Optimization', 'Ad Tech & QA', 'Live Streaming', 'Pacing & Analytics', 'Campaign Execution'],
  buttonText: 'View Case Study',
  route: 'JioHotstar.html',
  media: {
    backgroundImage: 'Photos/Sports_Logo.png',
    contentImages: []
  }
}
};

function renderJioHotstarCard(project) {
  const tags = project.tags.map(tag => `<li>${tag}</li>`).join('');
  const backgroundStyle = project.media.backgroundImage
    ? ` style="--jiohotstar-card-background: url('${project.media.backgroundImage}')"`
    : '';
  return `<a class="jiohotstar-experience-card" data-theme="${project.theme}"${backgroundStyle} href="${project.route}">
    <div class="jiohotstar-experience-card-content">
      <p class="eyebrow">${project.eyebrow}</p>
      <h3>${project.title}</h3>
      <p class="jiohotstar-experience-subtitle">${project.subtitle}</p>
      <p class="jiohotstar-experience-description">${project.description}</p>
      <ul class="jiohotstar-experience-tags" aria-label="${project.title} skills">${tags}</ul>
      <span class="jiohotstar-experience-button">${project.buttonText}</span>
    </div>
  </a>`;
}

const projectList = document.querySelector('[data-jiohotstar-projects]');
if (projectList) {
  projectList.innerHTML = [jioHotstarExperience.platform, jioHotstarExperience.sports]
    .map(renderJioHotstarCard)
    .join('');
}

const caseStudyHero = document.querySelector('[data-jiohotstar-hero]');
if (caseStudyHero) {
  const project = jioHotstarExperience[caseStudyHero.dataset.jiohotstarHero];
  if (project) {
    caseStudyHero.innerHTML = `<div class="jiohotstar-case-hero-content">
      <p class="eyebrow">${project.eyebrow}</p>
      <h1>${project.title}</h1>
      <p>${project.subtitle}</p>
    </div>`;
    caseStudyHero.dataset.theme = project.theme;
  }
}
