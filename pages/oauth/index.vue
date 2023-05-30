<script lang="ts" setup>
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useEtsyAuthStore } from '../../store/etsyAuthStore';
import type { AuthState } from '../../store/etsyAuthStore';


const store = useEtsyAuthStore();
const config = useRuntimeConfig();

const clientID = config.ETSY_KEYSTRING;
// const clientVerifier = '<same as the verifier used to create the code_challenge>';
// const redirectUri = 'localhost:3000/oauth/redirect';

// console.log('ETSY_REDIRECT_URL:', config.ETSY_REDIRECT_URL);

const initAuth = async () => {
    const { data } = await useFetch('/api/etsy-auth')
    console.log('\nAUTH DATA:', data.value);
    store.setState(data.value as AuthState);
    // console.log('VALUES:', { codeVerifier, codeChallenge, state })
    const { codeVerifier, codeChallenge, state } = data.value as AuthState;
    if (!codeVerifier || !codeChallenge || !state) {
        return;
    }

    

    const params = [
        ['response_type', 'code'],
        ['redirect_uri', config.ETSY_REDIRECT_URL],
        // ['redirect_uri', '/oauth/redirect'],
        ['scope', encodeURIComponent('listings_r recommend_r shops_r')],
        ['client_id', clientID],
        ['state', 'superstate'],
        ['code_challenge', codeChallenge],
        ['code_challenge_method', 'S256'],
    ].map(arr => arr.join('=')).join('&')

    // const URL = `http://localhost:3000/api/connect?${params.toString()}`
    const URL = `https://www.etsy.com/oauth/connect?${params}`
    console.log('URL:', URL, '\n\n')
    try {

        window.open(URL, '_blank')
        // await navigateTo(URL, {
        // //   redirectCode: 302,
        //   external: true,
        // });
        // await navigateTo("/oauth/redirect", {
        // //   redirectCode: 302,
        //   external: true,
        // });

        // const { data } = await useFetch(URL)
        // const { data } = await useFetch('/api/connect', { params })

        // console.log('\nINIT AUTH RES:', data.value)
        // console.log('\nINIT AUTH RES RAW:', data)
        // console.log('\nRES KEYS:', Object.keys(data))
        return data.value;
    } catch (e) {
        console.log('INIT AUTH FAILED:', e);
    }
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