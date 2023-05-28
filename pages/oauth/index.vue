<script lang="ts" setup>
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useEtsyAuthStore } from '../../store/etsyAuthStore';
import type { AuthState } from '../../store/etsyAuthStore';


const store = useEtsyAuthStore();
const config = useRuntimeConfig();

const clientID = config.ETSY_KEYSTRING;
const clientVerifier = '<same as the verifier used to create the code_challenge>';
const redirectUri = 'http://localhost:3000/oauth/redirect';

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
        // ['redirect_uri', redirectUri],
        ['redirect_uri', '/oauth/redirect'],
        ['scope', encodeURIComponent('listings_r recommend_r shops_r')],
        ['client_id', clientID],
        ['state', 'superstate'],
        ['code_challenge', codeChallenge],
        ['code_challenge_method', 'S256'],
    ].map(arr => arr.join('=')).join('&')

    // https://www.etsy.com/oauth/connect?
    //   response_type=code
    //   &redirect_uri=https://www.example.com/some/location
    //   &scope=transactions_r%20transactions_w
    //   &client_id=1aa2bb33c44d55eeeeee6fff&state=superstate
    //   &code_challenge=DSWlW2Abh-cf8CeLL8-g3hQ2WQyYdKyiu83u_s7nRhI
    //   &code_challenge_method=S256

    // http://localhost:3000/api/connect?
    //   response_type=code
    //   &redirect_uri=http://localhost:3000/oauth/redirect
    //   &scope=listings_r%20recommend_r%20shops_r
    //   &client_id=a5lkmh70hij36y09qludpuza&state=superstate
    //   &code_challenge=kjE8cws95mLY9egVnE9Ec1NZ6OjUokcefoWAQ6me-y0
    //   &code_challenge_method=S256 

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