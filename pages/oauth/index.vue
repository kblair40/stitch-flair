<script lang="ts" setup>
import axios from 'axios';
// import { useEtsyAuthStore } from '../../store/etsyAuthStore';


// const store = useEtsyAuthStore();
const config = useRuntimeConfig();

const clientID = config.ETSY_KEYSTRING;
const clientVerifier = '<same as the verifier used to create the code_challenge>';
const redirectUri = 'http://localhost:3000/oauth/redirect';

const initAuth = async () => {
    const { data } = await useFetch('/api/etsy-auth')
    console.log('\nAUTH DATA:', data.value);
    // const { codeVerifier, codeChallenge, state } = store.makeCodes();
    // console.log('VALUES:', { codeVerifier, codeChallenge, state })
    // try {
    //     const res = await axios.get('https://www.etsy.com/oauth/connect', {

    //     })
    // } catch (e) {
    //     console.log('INIT AUTH FAILED:', e);
    // }
}
</script>

<template>
    <Page>
        <PageTitle>OAuth</PageTitle>

        <div class="flex justify-center h-full border pt-8">
            <button @click="initAuth" class="w-32 h-10 rounded-md border bg-slate-50 font-medium">Login</button>
        </div>

    </Page>
</template>