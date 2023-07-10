<script lang="ts" setup>
import emailjs from '@emailjs/browser';

const SERVICE_ID = "service_ujghu3o"
const TEMPLATE_ID = "template_26u3nzi"

// emailjs.send(SERVICE_ID, TEMPLATE_ID);


const inputClasses = [
    'rounded-md focus-visible:outline-none px-3',
    'h-10 w-full transition-colors',
    'border border-whitepeach hover:border-whitepeach-500 focus:border-whitepeach-700'
]
const textareaClasses = [
    inputClasses[0],
    'w-full pt-2 transition-colors',
    inputClasses[2],
]
const buttonClasses = [
    'border border-whitepeach-300',
    'transition-colors duration-300',
    'w-1/2 mx-auto py-2 px-6 rounded-md',
    'text-lg font-medium',
    'bg-lightpeach-50 text-purplegrey-600',
    'hover:bg-lightpeach-100 active:bg-lightpeach-200',
]

const values = reactive({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
})

const sending = ref(false);
const handleSubmit = async () => {
    const config = useRuntimeConfig();
    const publicKey = config.EMAIL_PUBLIC_KEY;
    console.log('PUBLIC KEY:', publicKey)

    console.log('\nVALS:', values);
    try {
        sending.value = true;
        const sendRes = await emailjs.send(SERVICE_ID, TEMPLATE_ID, values, publicKey);
        console.log('\nSEND RES:', sendRes, '\n')
    } catch (e) {
        console.warn('Error sending email:', e);
    }
    sending.value = false;
}
</script>

<template>
    <div>
        <div class="flex flex-col space-y-6 items-center">
            <div class="flex space-y-6 md:space-x-6 md:space-y-0 w-full flex-col md:flex-row">
                <FormControl label="Name">
                    <input v-model="values.from_name" :class="inputClasses" />
                </FormControl>

                <FormControl label="Email">
                    <input v-model="values.from_email" :class="inputClasses" />
                </FormControl>
            </div>

            <FormControl label="Subject">
                <input v-model="values.subject" :class="inputClasses" />
            </FormControl>

            <FormControl label="Message">
                <textarea v-model="values.message" rows="3" :class="textareaClasses" />
            </FormControl>

            <button @click="handleSubmit" class="submit-btn" :class="buttonClasses">Send</button>
        </div>
    </div>
</template>

<style scoped lang="css">
.submit-btn {
    /* background-color: #CE882B; */
    /* opacity: 0.7; */
}
</style>