<template>
    <v-form
        v-if="!isDogShowed"
        validate-on="submit lazy"
        @submit.prevent="isDogShowed = true"
    >
        <v-container
            fluid
            class="w-50 mt-5"
        >
            <span class="text-h2">Собаки...</span>
            <v-row class="mt-5">
                <v-col>
                    <span>Выберите энергичность собаки:</span>
                    <v-select
                        v-model="selectedEnergy"
                        @update:modelValue="fetchDogs"
                        :items="['2', '3', '4', '5']"
                    />
                </v-col>
                <v-col>
                    <span>Выберите породу собаки:</span>
                    <v-autocomplete
                        v-model="selectedDog"
                        :items="dogs"
                        item-title="name"
                        :loading="loading"
                        :disabled="dogs.length === 0"
                        no-data-text="Нет данных"
                        return-object
                    />
                </v-col>
                <v-col
                    :cols="12"
                    class="d-flex justify-end"
                >
                    <v-btn
                        color="primary"
                        text="Подтвердить"
                        type="submit"
                        :disabled="!selectedDog"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    <v-container
        v-else
        class="mt-5"
    >
        <span class="text-h2">Ваша собака</span>
        <v-card
            class="mx-auto my-8"
            elevation="5"
            :loading="!selectedDog.image_link"
        >
            <v-card-item>
                <v-card-title>
                    {{ selectedDog.name }}
                </v-card-title>
                <v-card-subtitle>
                    Энергичность: {{ selectedDog.energy }}
                </v-card-subtitle>
            </v-card-item>
            <v-row>
                <v-col class="pa-2">
                    <v-img
                        :src="selectedDog.image_link"
                        :width="600"
                        aspect-ratio="16/9"
                        cover
                    />
                </v-col>
                <v-col :style="'line-height: 2.2; font-size: 1.1em;'">
                    Дружелюбная с детьми: {{ selectedDog.good_with_children }}
                    <br />
                    Дружелюбная с другими собаками:
                    {{ selectedDog.good_with_other_dogs }} <br />
                    Игривость: {{ selectedDog.playfulness }} <br />
                    Лает: {{ selectedDog.barking }} <br />
                    Защищает хозяина: {{ selectedDog.protectiveness }} <br />
                    Срок жизни: {{ selectedDog.min_life_expectancy }} -
                    {{ selectedDog.max_life_expectancy }} лет<br />
                    Рост: {{ selectedDog.min_height_female }} -
                    {{ selectedDog.max_height_female }} см<br />
                    Вес: {{ selectedDog.min_weight_female }} -
                    {{ selectedDog.max_weight_female }} кг<br />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import axiosApiInstance from '../api/axiosApiInstance.ts';
import { ref } from 'vue';

const dogs = ref([]);

const selectedEnergy = ref();

const selectedDog = ref();

const isDogShowed = ref(false);

const loading = ref(false);

const fetchDogs = async () => {
    dogs.value = [];
    loading.value = true;
    for (let i = 0; i < 120; i += 20) {
        dogs.value.push(
            ...(
                await axiosApiInstance.get(
                    `?energy=${selectedEnergy.value}&offset=${i}`,
                )
            ).data,
        );
    }
    loading.value = false;
};
</script>

<style scoped></style>
