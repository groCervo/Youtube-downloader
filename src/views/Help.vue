<template>
    <v-row align="center" justify="center" style="height: 100%">
        <a
            @click.prevent="openExternalUrl(githubLink)"
            :href="githubLink"
            target="_blank"
            class="github-corner"
            aria-label="View source on GitHub"
        >
            <svg
                width="80"
                height="80"
                viewBox="0 0 250 250"
                :style="
                    `fill: ${$vuetify.theme.currentTheme.black};
                    color: #fff;
                    position: absolute;
                    bottom: 0;
                    border: 0;
                    left: 0;
                    transform: scale(-1, 1) rotate(90deg);
                    `
                "
                aria-hidden="true"
            >
                <path
                    d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
                ></path>
                <path
                    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                    fill="currentColor"
                    style="transform-origin: 130px 106px"
                    class="octo-arm white--text"
                ></path>
                <path
                    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                    fill="currentColor"
                    class="octo-body white--text"
                ></path>
            </svg>
        </a>

        <v-container style="height: 100%">
            <v-row align="center" justify="center" class="mb-5">
                <v-col cols="5">
                    <v-card class="dullPrimary" height="88">
                        <v-row align="center" justify="center" style="height: 100%">
                                <h1 class="grayThree--text">{{ $t("help.title") }}</h1>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row align="center    " justify="center" style="height: 60%" class="mb-5">
                <v-col
                    v-for="(step, index) in downloadSteps"
                    :key="index"
                    cols="4"
                    lg="3"
                    style="height: 100%; max-height: 350px"
                >
                    <step-tiles :step="index + 1">
                        <template v-slot:title>{{ $t(step.title) }}</template>
                        <template v-slot:content>{{ $t(step.content) }}</template>
                    </step-tiles>
                </v-col>
            </v-row>
            <!-- <v-row align="center" justify="center">
                <v-col cols="6">
                    <v-card class="grayTwo mt-5 mb-3" height="100">
                        <v-container style="height: 100%">
                            <v-row align="center" justify="center" style="height: 100%">
                                <v-col cols="9">
                                    <h4 class="black--text" style="line-height: 20px" v-html="$t('help.aboutContent')"></h4>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row> -->
            <v-row align="center" justify="center">
                <v-col cols="12" style="text-align: center;">
                    <v-btn class="info" rounded width="150" height="50" @click="openExternalUrl(donateLink)">
                        <h3 class="white--text">{{ $t('help.donate') }}</h3>
                    </v-btn>
                </v-col>
            </v-row>        
        </v-container>

    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StepTiles from "@/components/StepTiles.vue";

const { myIpcRenderer } = window;

@Component({
    components: {
        StepTiles,
    },
})
export default class Help extends Vue {
    githubLink = "https://github.com/groCervo/Youtube-downloader";
    donateLink = "https://paypal.me/sixIf";
    downloadSteps = [
        {
            title: "help.downloadSteps.firstTitle",
            content: "help.downloadSteps.firstContent",
        },
        {
            title: "help.downloadSteps.secondTitle",
            content: "help.downloadSteps.secondContent",
        },
        {
            title: "help.downloadSteps.thirdTitle",
            content: "help.downloadSteps.thirdContent",
        },
    ];

    openExternalUrl(link: string) {
        myIpcRenderer.send("open-external-url", link);
        this.$vuetify.theme.currentTheme.black;
    }
}
</script>

<style>
.github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
    0%,
    100% {
        transform: rotate(0);
    }
    20%,
    60% {
        transform: rotate(-25deg);
    }
    40%,
    80% {
        transform: rotate(10deg);
    }
}
@media (max-width: 500px) {
    .github-corner:hover .octo-arm {
        animation: none;
    }
    .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
    }
}
</style>