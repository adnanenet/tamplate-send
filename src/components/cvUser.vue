<script setup >
import {computed, ref, onMounted } from "vue";
import { resumeData,cvSettings } from "@/data";


const resume = ref(resumeData)
const model = ref(cvSettings)
const cvContent = ref(null);

const getTemplateData = () => {
  if (model.value.templateData) {
    return { name: model.value.templateData.template };
  }
  return {};
};

const getHtmlContent = () => {
  if (cvContent.value) {
    const html = cvContent.value.innerHTML;
    // Remove data-v-* attributes
    const cleanedHtml = html.replace(/ data-v-[a-z0-9]+=""/g, '');

    // Parse HTML string into a document
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanedHtml, 'text/html');

    // Convert document to an object
    const htmlObject = {
      doctype: doc.doctype ? doc.doctype.name : 'html',
      html: doc.documentElement.outerHTML
    };

    return htmlObject;
  }
  return {};
};

const loadStyles = async () => {
  const response = await fetch('/src/assets/tamplate.scss');
  const cssText = await response.text();
  
  const cleanedCssText = extractCssContent(cssText);
  const cssWithValues = replaceVBindVariables(cleanedCssText, {
    backgroundColor: model.value.templateData?.theme.background,
    fontSize: model.value.templateData?.typography.size + 'px',
    primaryColor: model.value.templateData?.theme.primary,
    textColor: model.value.templateData?.theme.text,
    setBorderRadius: model.value.templateData?.company_logo.borderRadius + 'px',
    setUnderlineLinks: model.value.templateData?.typography.underlineLinks ? 'underline' : 'none'
  });

  const cssObject = {
    css: cssWithValues
  };

  return cssObject;
};

const extractCssContent = (css) => {
  const startIndex = css.indexOf('{');
  const endIndex = css.lastIndexOf('}');
  const cssContent = css.slice(startIndex, endIndex + 1);
  const regex = /__vite__css = "([^"]+)"/;
  const match = regex.exec(css);
  return match ? match[1] : cssContent;
};

const replaceVBindVariables = (css, variables) => {
  return css.replace(/v-bind\(([^)]+)\)/g, (match, p1) => {
    return variables[p1.trim()] || match;
  });
};

const getTemplateDataCombined = async () => {
  const templateData = getTemplateData();
  const htmlContent = getHtmlContent();
  const cssContent = await loadStyles();

  return {
    name: templateData.name,
    html: htmlContent.html,
    css: cssContent.css
  };
};

const data = ref({});

onMounted(async () => {
  data.value = await getTemplateDataCombined();
});

defineExpose({
  data,
});


// other variables


const fontSize = computed(() => {
  return model.templateData?.typography.size + 'px';
})
const lineHeight = computed(() => {
  return model.templateData?.typography.lineHeight;
})

const primaryColor = computed(() => {
  return model.templateData?.theme.primary;
})
const backgroundColor = computed(() => {
  return model.templateData?.theme.background;
})

const textColor = computed(() => {
  return model.templateData?.theme.text;
})
const setFormat = computed(() => {
  if (model.templateData?.page.format == 'a4') {
    return {width: 8.5 + 'in', height: 11 + 'in'};
  } else {
    return {width: 8.27 + 'in', height: 11.69 + 'in'};

  }
})

const setUnderlineLinks = computed(() => {
  return model.templateData?.typography.underlineLinks ? 'underline' : 'none';
})
const setBorderRadius = computed(() => {
  return model.templateData?.company_logo.borderRadius + 'px';
})

const isShowName = computed(() => {
  return model.templateData?.personnel?.name;
})

const isShowAge = computed(() => {
  return model.templateData?.personnel?.age;
})


const isShowPhone = computed(() => {
  return model.templateData?.personnel?.phone;
})

const isHeadline = computed(() => {
  return model.templateData?.page.headline;
})



const isShowEmail = computed(() => {
  return model.templateData?.personnel?.email;
})


const isShowCity = computed(() => {
  return model.templateData?.personnel?.city;
})
const setReference = computed(() => {
  return model.templateData?.personnel?.reference ;
})


</script>

<template>
  <div ref="cvContent">
  <div class="page" data-size="A4" :class="model.templateData.typography.family">
    <div class="container">
      <div class="resume"
      >
        <img :src="model.templateData.company_logo.url"
             v-if="!model.templateData.company_logo.hidden"
             class="company-logo"
             :style="{width:model.templateData.company_logo.size + 'px',
             aspectRatio:model.templateData.company_logo.aspectRatio ,
             }"
        />
        <div class="header">
          <div class="full-name position-relative">
            <span class="first-name" v-if="isShowName">{{ resume.name }}</span>
            <span class="first-name" v-else>{{ setReference }}</span>
          </div>
          <div class="contact-info">
            <div class="position" v-if="isHeadline">{{ resume.headline }}</div>
            <br>
            <span class="email"> Email: </span>
            <span class="email-val">{{ isShowEmail ? resume.email : '---------' }}</span>
            <span class="separator"></span>
            <span class="phone">Phone: </span>
            <span class="phone-val">{{ isShowPhone ? resume.phone : '---------' }}</span>
            <span class="separator"></span>
            <br>
            <span class="phone">City: </span>
            <span class="phone-val">{{ isShowCity ? resume.city : '---------' }}</span>
            <span class="separator"></span>
            <span class="phone">Age: </span>
            <span class="phone-val">{{ isShowAge ? resume.age  : '---------' }} </span>
          </div>


          <br>
          <!--          <iframe :srcdoc="resume.summary"  class="summary" v-if="model.templateData.page.summary"></iframe>-->
          <div v-html="resume.summary" class="summary desc" v-if="model.templateData.page.summary">

          </div>
        </div>
        <div class="details">
          <div class="section Experience" v-if="model.templateData.experience.visible">
            <div class="section__title ">{{ model.templateData.experience.name }}</div>
            <div class="section__list" v-for="item in resume.work">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.company_name }}</div>
                  <div class="name">{{ item.job_title }}</div>
                  <div class="desc" v-html="item.responsibilities"></div>
                </div>
                <div class="right">
                  <div class="duration">{{ item.start_date + ' ' + item.end_date }}</div>
                  <div class="addr">{{ item.city }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="section Education" v-if="model.templateData.education.visible">
            <div class="section__title">{{ model.templateData.education.name }}</div>
            <div class="section__list" v-for="item in resume.educations">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.institution }}</div>
                  <div class="addr">{{ item.degree }}</div>
                </div>
                <div class="right">
                  <div class="duration"> {{item.start_year ? item.start_year : ''  }} -  {{   item.end_year ? item.end_year  : '' }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Projects" v-if="model.templateData.projects.visible">
            <div class="section__title">{{ model.templateData.projects.name }}</div>
            <div class="section__list" v-for="item in resume.projects">
              <div class="section__list-item">
                <div class="name">{{ item.project_name }}</div>
                <div class="duration">{{ item.start_date + ' ' + item.end_date }}</div>
                <div class="text desc" v-html="item.description">
                </div>
              </div>
            </div>
          </div>
          <div class="section Certification" v-if="model.templateData.certifications.visible">
            <div class="section__title">{{ model.templateData.certifications.name }}</div>
            <div class="section__list" v-for="item in resume.certifications">
              <div class="section__list-item">
                <div class="left">
                  <div class="addr">{{ item.institution }}</div>
                  <div class="duration">{{ item.date }}</div>
                  <div class="name">{{ item.certification }}</div>
                  <div class="link">{{ item.link }}</div>
                </div>
                <div class="right">
                </div>
              </div>
            </div>

          </div>

          <div class="section References" v-if="model.templateData.references.visible">
            <div class="section__title">{{ model.templateData.references.name }}</div>
            <div class="section__list" v-for="item in resume.references">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.company }}</div>
                  <div class="name" style="font-weight: 600">{{ item.position }}</div>
                  <div class="desc">{{ item.name }}</div>
                </div>
                <div class="right">
                  <div class="duration">{{ item.email }}</div>
                  <div class="addr">{{ item.phone }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Volunteering" v-if="model.templateData.volunteering.visible">
            <div class="section__title">{{ model.templateData.volunteering.name }}</div>
            <div class="section__list" v-for="item in resume.volunteering">
              <div class="section__list-item">
                <div class="left">
                  <div class="name">{{ item.organization }}</div>
                  <div class="desc" v-html="item.description"></div>
                </div>
                <div class="right">
                  <div class="name">{{ item.position }}</div>
                  <div class="duration">{{ item.start_date + ' ' + item.end_date }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Skills" v-if="model.templateData.skills.visible">
            <div class="section__title">{{ model.templateData.skills.name }}</div>
            <div class="skills" style="flex-wrap: wrap ; display: flex;gap: 10px">
              <div class="skill" v-for="item in resume.skills">
                <div class="skill-name">{{ item.skill }}
                </div>
                <div class="skill-bar">
                  <div
                      v-for="(level, index) in 5"
                      :key="index"
                      :class="['skill-level', { 'dash-filled': +index < +item.level }]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="section Social" v-if="model.templateData.social.visible">
            <div class="section__title">{{ model.templateData.social.name }}</div>
            <div class="skills">
              <div class="skills__item" style="display: flex; flex-wrap: wrap">
                <div v-for="item in resume.social" style="padding: 3px;">
                  {{ item.skill }},
                </div>
              </div>
            </div>
          </div>
          <div class="section" v-if="model.templateData.languages.visible">
            <div class="section__title">{{ model.templateData.languages.name }}</div>
            <div class="socials">
              <div class="skills__item" v-for="item in resume.languages">
                <div class="left">
                  <div class="name">
                    {{ item.language }}
                  </div>
                </div>
                <div class="right">
                  <div class="skill">
                    <div class="skill-bar">
                      <div
                          v-for="(level, index) in 5"
                          :key="index"
                          :class="['skill-level', { 'dash-filled': +index < +item.level }]"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section" v-if="model.templateData.interests.visible">
            <div class="section__title">
              {{ model.templateData.interests.name }}
            </div>
            <div class="section__list">
              <div class="section__list-item">
                <span v-for="item in resume.interests">
                  {{ item.interest }},
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped lang="scss">
@import '../assets/tamplate.scss';
</style>