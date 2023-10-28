<template>
  <form @submit.prevent="handleSubmit">
    <div class="card mb-4">
      <h5 class="card-header">Profil du consultant</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-xs-12 col-lg-6">
            <div class="d-flex align-items-start align-items-sm-center gap-4">
              <img
                :src="newProfile.profilePhoto ? newProfile.profilePhoto : getAvatar()"
                alt="user-avatar"
                class="d-block rounded"
                height="100"
                width="100"
                id="profilePhoto"
                v-if="props.isUpdate"
              />
              <img
                src="/assets/img/avatars/avatar-placeholder.jpg"
                alt="user-avatar"
                class="d-block rounded"
                height="100"
                width="100"
                id="profilePhoto"
                v-else
              />
              <div class="button-wrapper">
                <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                  <span class="d-none d-sm-block">Téléverser une photo</span>
                  <i class="bx bx-upload d-block d-sm-none"></i>
                  <input
                    type="file"
                    id="upload"
                    class="account-file-input"
                    accept="image/png, image/jpeg"
                    hidden
                  />
                </label>
                <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                  <i class="bx bx-reset d-block d-sm-none"></i>
                  <span class="d-none d-sm-block">Réintialiser</span>
                </button>
                <p class="text-muted mb-0">JPG ou PNG. Taille maximale 1MB</p>
              </div>
            </div>
          </div>
          <div class="mb-4 d-lg-none"></div>
          <div class="col-xs-12 col-lg-6" v-if="props.isUpdate">
            <div class="row">
              <div class="col-xs-12 col-sm-6">
                <div class="mb-2">Prénom et nom</div>
                <div class="fw-bold">
                  <span v-show="newProfile.sex === 'male'">Mr.</span>
                  <span v-show="newProfile.sex === 'female'">Mme.</span>
                  {{ newProfile.firstName }}
                  {{ newProfile.lastName }}
                </div>
              </div>
              <div class="col-xs-12 col-sm-6">
                <div>Email</div>
                <div class="fw-bold my-2">
                  <a :href="'mailto:' + newProfile.email">{{ newProfile.email }}</a>
                </div>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-xs-12 col-sm-6">
                <div class="mb-2">Poste</div>
                <div class="fw-bold my-2">{{ newProfile.position }}</div>
              </div>
              <div class="col-xs-12 col-sm-6">
                <div>Téléphone</div>
                <div class="fw-bold my-2">
                  <a :href="'tel:' + newProfile.phone">{{ newProfile.phone }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <div class="row mb-3">
          <label for="civility" class="form-label">Civilité</label>
          <div class="col-md">
            <div class="form-check form-check-inline mt-3 with-pointer">
              <input
                class="form-check-input"
                type="radio"
                name="sex"
                id="male"
                value="male"
                :checked="newProfile.sex === 'male'"
                @input="newProfile.sex = 'male'"
              />
              <label class="form-check-label with-pointer" for="male">Mr.</label>
            </div>
            <div class="form-check form-check-inline with-pointer">
              <input
                class="form-check-input"
                type="radio"
                name="sex"
                id="female"
                value="female"
                :checked="newProfile.sex === 'female'"
                @input="newProfile.sex = 'female'"
              />
              <label class="form-check-label with-pointer" for="female">Mme.</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="position" class="form-label required">Poste</label>
            <input
              class="form-control"
              type="text"
              id="position"
              name="position"
              placeholder="Ex : Développeur web"
              required
              :value="newProfile.position"
              @input="({ target }) => (newProfile.position = target.value)"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="linkedInLink" class="form-label">Profil LinkedIn</label>
            <input
              type="text"
              class="form-control"
              id="linkedInLink"
              name="linkedInLink"
              placeholder="Ex : https://www.linkedin.com/in/john.doe"
              :value="newProfile.linkedInLink"
              @input="({ target }) => (newProfile.linkedInLink = target.value)"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <div class="d-flex justify-content-between">
              <label for="skills" class="form-label required"
                >Compétences - {{ skillsArray ? skillsArray.length : skillsLimit }}/{{
                  skillsLimit
                }}</label
              >
              <small class="with-pointer" @click="handleClickEmptySkills">Vider</small>
            </div>
            <tags-input
              placeholder="Ex : Java, Python, Jira"
              :limit="skillsLimit"
              :allow-duplicates="false"
              :tags="skillsArray"
              @tags-changed="handleSkillsChanged"
            />
            <small id="noteHelp" class="form-text text-muted"
              >Appuyez le bouton "Entrer" pour confirmer</small
            >
          </div>
          <div class="mb-3 col-md-4">
            <label for="formFile" class="form-label">Dossier de compétence</label>
            <input class="form-control" type="file" id="formFile" />
          </div>
          <div class="mb-3 col-md-2">
            <label for="position" class="form-label required">Années d'expérience</label>
            <input
              class="form-control"
              id="position"
              name="position"
              placeholder="Ex : 6"
              type="number"
              step="1"
              required
              v-model.number="newProfile.yearsOfExperience"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="firstName" class="form-label required">Prénom</label>
            <input
              class="form-control"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Ex : Prénom"
              required
              :value="newProfile.firstName"
              @input="({ target }) => (newProfile.firstName = target.value)"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="lastName" class="form-label required">Nom</label>
            <input
              class="form-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex : Doe"
              required
              :value="newProfile.lastName"
              @input="({ target }) => (newProfile.lastName = target.value)"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="email" class="form-label required">E-mail</label>
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              placeholder="Ex : john.doe@example.com"
              required
              :value="newProfile.email"
              @input="({ target }) => (newProfile.email = target.value)"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label class="form-label required" for="phone">Téléphone</label>
            <div class="input-group input-group-merge">
              <input
                type="text"
                id="phone"
                name="phone"
                class="form-control"
                placeholder="Ex : 123456789"
                :value="newProfile.phone"
                @input="({ target }) => (newProfile.phone = target.value)"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="availableAt" class="form-label required">Date de disponibilité</label>
            <input
              type="date"
              class="form-control"
              id="availableAt"
              name="availableAt"
              :value="newProfile.availableAt?.substring(0, 10)"
              @input="({ target }) => (newProfile.availableAt = target.value)"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="hiredAt" class="form-label required">Date d'embauche</label>
            <input
              type="date"
              class="form-control"
              id="hiredAt"
              name="hiredAt"
              :value="newProfile.hiredAt?.substring(0, 10)"
              @input="({ target }) => (newProfile.hiredAt = target.value)"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="note" class="form-label">Note</label>
            <textarea
              class="form-control"
              id="note"
              name="note"
              rows="2"
              maxlength="500"
              placeholder="Ex : John Doe est un excellent développeur"
              :value="newProfile.note"
              @input="
                ({ target }) => {
                  newProfile.note = target.value
                  note = target.value
                }
              "
            ></textarea>
            <small id="noteHelp" class="form-text text-muted"
              >{{ note ? 500 - note.length : 500 }} caractères restants</small
            >
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2 btn-submit" :disabled="props.loading">
            <span v-if="!props.loading"> {{ props.isUpdate ? 'Mettre à jour' : 'Soumettre' }}</span>
            <div class="spinner-grow spinner-grow-sm" role="status" v-else>
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <button type="reset" class="btn btn-outline-secondary">Réintialiser</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
import TagsInput from '@/components/shared/inputs/tags-input.vue'
import { generateFromString } from 'generate-avatar'
const note = ref('')
const skillsArray = ref([])
const skillsLimit = 4
const props = defineProps(['profile', 'isUpdate', 'loading'])
let newProfile = {}
if (props.isUpdate) {
  if (props.profile.note) {
    note.value = props.profile.note
  }
  if (props.profile.skills?.arr) {
    skillsArray.value = props.profile.skills?.arr
  }
  newProfile = { ...props.profile }
}
const emit = defineEmits(['submit'])
const handleSubmit = () => {
  const payload = { ...newProfile, skills: { arr: toRaw(skillsArray.value) } }
  emit('submit', payload)
}
const getAvatar = () => {
  return `data:image/svg+xml;utf8,${generateFromString(props.profile._id)}`
}
const handleSkillsChanged = (v) => {
  skillsArray.value = v
}
const handleClickEmptySkills = () => {
  skillsArray.value = []
}
</script>

<style scoped>
.btn-submit {
  width: 200px;
}
</style>
