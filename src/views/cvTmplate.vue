<script setup >
import {computed, ref} from "vue";
import { resumeData,cvSettings } from "@/data";

const resume = ref(resumeData)
const model = ref(cvSettings)



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
</template>


<style scoped lang="scss">

div.page {
  //background: white;
  background-color: v-bind(backgroundColor);
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  position: relative;
  font-size: v-bind(fontSize);
  box-shadow: 1px 1px 2px #DAD7D7;


}

div.page[data-size="A4"] {
  width: 21cm;
  height: auto;
  min-height: 29.7cm;
}


@page {
  size: 21cm 29.7cm;
  margin: 0mm;
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: v-bind(backgroundColor);

}

.resume {
  //height: auto !important;
  //font-size: v-bind(fontSize);
  //
  //line-height: v-bind(lineHeight);
  //min-height: 11.69in;
  //min-width: 8.27in;

}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

.company-logo {
  position: relative;
  float: right;
  border-radius: v-bind(setBorderRadius);
  top: 6px;
  right: 30px;
  height: auto;
  //max-width: 15%;
  margin-top: 10px;
}


* {
  color: v-bind(textColor);
}


* {
  :deep(ul), :deep(ol) {
    padding: 0 1.25rem;
    margin: 10px;
  }

}

.header {
  margin-left: 10px;

  margin-bottom: 0px;

  .full-name {
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .first-name {
    font-weight: 700;
  }

  .last-name {
    font-weight: 300;
  }

  .contact-info {
    margin-bottom: 0px;
  }

  .email,
  .phone {
    font-weight: bold;
    color: v-bind(textColor);
    //font-weight: 300;
  }

  .separator {
    height: 9px;
    display: inline-block;
    border-left: 2px solid v-bind(primaryColor);
    margin: 0px 10px;
  }

  .position {
    font-weight: bold;
    display: inline-block;
    margin-right: 10px;
    text-decoration: underline;
    text-decoration: v-bind(setUnderlineLinks);
  }
}


.details {
  line-height: 20px;
  margin-left: 10px;

  .section {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .section:last-of-type {
    margin-bottom: 0px;
  }

  .section__title {
    letter-spacing: 2px;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
    color: v-bind(primaryColor);
  }

  .section__list-item {
    margin-bottom: 40px;
  }

  .section__list-item:last-of-type {
    margin-bottom: 10px;
  }

  .left,
  .right {
    vertical-align: top;
    display: inline-block;
  }


  .left {
    width: 60%;
  }

  .right {
    tex-align: right;
    width: 39%;
  }

  .name {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #000;
    font-style: italic;
  }

  a:hover {
    text-decoration: underline;
    color: #000;
  }

  .skills {


    .skill {


      .skill-name {
        font-size: 18px;
        padding-bottom: 5px;
      }

      .skill-bar {
        //display: flex;
        gap: 5px; /* Space between dashes */
        display: inline-flex;
      }

      .skill-level {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background-color: #e0e0e0; /* Default color for empty dash */
      }

      .dash-filled {
        background-color: v-bind(primaryColor);
      }
    }
  }

  .link {
    text-decoration: v-bind(setUnderlineLinks);
  }

  .skills__item {
    margin-bottom: 10px;
  }

  .skills__item .right {
    input {
      display: none;
    }
  }
}

//*{
//   color: white;
// }

</style>