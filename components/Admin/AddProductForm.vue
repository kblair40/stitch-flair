<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'
// import { useShopStore } from '~~/store/shopStore';

import { useAdminStore } from '~~/store/adminStore';
import { toTitleCase } from '~~/utils/helpers';
import type { Product } from '~~/utils/types';

defineEmits(['submit'])

// const store = useShopStore();
const store = useAdminStore();
store.getCategories();
store.getPromotions();

const imageUrls = [
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgWEhUYGBgYGBgYGBgYGBIZERkYGRgaGhgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHBISGjErISU0NDQ0NDQ0NTQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAD8QAAIBAgMFBQcCBAUDBQAAAAECAAMRBBIhBTFBUWEGMnGBkRMiobHB0fBC4RRicpIHM1KC8SOishUXQ1PC/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAQEAAwEBAAMBAAAAAAAAAQIREiExQQMiMlET/9oADAMBAAIRAxEAPwDyGsZEu+PqGMWMl5subDZg0mP2VvE2eyxpNM/GGvqzRYQixiLJ0WUk5VkWKNhCVWB486GAYrbTamZfFTSbXOpmdxCyNNMATOzpWK0hq5JEQndrO0EvwhaIQNBrz4fGAXHZza6YbvKTfU2IuLHW4mlrdqjUeyIFIFhr+qzAi45EAi31EwtHCux0t5ESwSiRv38bWP5uB8o//Wz0m/ylvU+Jxyt71Us9RgpZyfeuLBgeWt/hAcoAzZdbhhfXT3rqdwvuPpCUwgzXP4ecmp4L3t+/lY+Ui7XMcRbNRq1RcqIfeF8zJTT+ks3O0kGzgHfIrgK5UBwPaKRuVraZhbhyhNLB2ObLu4W08rcZZpQZ7NfIxdmJFwLsQQ194sCRr0lSzUTZc1X7QxBdL1AMygLyboZnK7zUY9kNNmqL75sAR7l/5mBOpty/eZfE0yDu8JWpyROfdQUzrDUEgo0YWFtFDqJkktGlrFC8OI5CtG4LDS7wz5YBQqACSCpLjOrj+JvG+1gKNJRGXBYqzhqQcTt4DglGhSPK0NJUeBLHPFAfaRQDyJzOLEY5BrMXSudlbxNtskaTH7JpaibTZaWE1yw19W6CSosjWTLGlIJWbUawMsxKnaq6GAYfaj6mVD2MstqIcxlQ4blIrTImnRBhaYFSOEqA7jgYVTrNl10vDsh2X/ruIyqbKJ3Dpm33t6k9Bf5zlNQT9ZcYPC3t6CY601zl2jhxl0AW/LVvM/nlHpgTw/P36S2o4HpD8Ngdd26ZXTfOWXfAuvPTfyltsrDNvPKaFNn3XUSbB7NK8N+ok+dVMRRDBMDdd2+263hDsIq2swyng1vda/6G4DodPjLv/wBPI4SJ8ARraPO7C1iVPS2RTrplYBrAgowXMouNQ1r2HwzdZS7Q7GpkKG4K3KNbS3FT1Ev9nsyMCu8fp13fy/Y9eemmourrlqDQ908Ru0+InXjflPbi3/O5vp4dj9jPQsWF1O5h3T5yreeodpsH7FjTqC9CsdCf/jc8RyBPCeZ4qkUdkbepIi16+Fm2/UIhFIwcSamYSrsH0Xh1GV1Ew+i8uMqPpiTgQSnVhK1BKB9orRBo4QBBY9VnVj7QBtoo6KBPKWw5kuGwxvNA+zpLh8DrI8Wnkl2Thd01eGp2EC2fhgBLVRLjOnCSIZGJKggSYQbGUcwhKzrjSAY/HbMBMgpbDU75ocZpKx8QV1lyRNt/ET9n0VSxtYCYzEgF9N35aa/F4p3QliQg4DjMuia/CZ/2s9SNf4y+7TsLS1mm2Xht0q8DQuZqtn0bWnHquvMWWFwANry1pYQAaCR4MaSxRJHGvUS4cbodSwo5RUacORdI5CtDfw4nGwoMMyxFZXC6qXwoU3Ah2CKkEHwt0/PrHVFggJVrx5141Os+UD9osGK1B0qd9NQTxA3H0Inke2sM1w5Bv3WvvuNx9J7LtWsMityIv4H3SD5H4CecbYs+cDcL6dQd/mJ0Tmo5Nf466xJEehhL0r8JH7OLnF96lpvCEqQVRHCPpcGpWhFPEStWSq0OlxapiZOleUocwmg5j6VyvaTXhIWBYEXlylDSWmgssUM9nFAusXVxQncNXuZRe3vDcE+sXT42WBfSHiUuAraCW1N7xpTrJEEjWSpAJUET7o5IyqdI4FTjNTBamEzoQve3j95FtjHrSBZrnkBa5PS8oT2wde5RXxZmPwAHzlXWZ9TMavwtsY57FCoW1ri993CV2HEGx+0KuIYswUFjuQED4kzlGlVO428wPlObd7XVicjUbLSajCppPNkp117tRv8Aa9QfIQyjiMavdep/dm/8plc9/Wudc/Hq+EGksqNp5LQ7TY+n3jn/AK6an4pYy62b2+1tWQrrqyHMPNTqPjJubF+cr06ksJAlHsnbFOsoam4YcbHceRHA9DLOpilUZmIAA4xSmKnHMw21O3lBCVR85HBBm/7u78ZRV/8AEKsf8uiLc3bX0A+sclv4VuZ9r1EiC1knnC9u8aR7tFPNKp+TCSr22xx72GQ/0pXH1MfjS8o2eK1GU6A3F+AuOPSZnaeHyOxsBmUqRa4t169ZXYjt2/dq4YIeftCG/sZB84PU7TI/fV15EgG3S6k6eU3/AJXn1zf2nlPSDEYAcP3lfUwtpcJjqT911PQmzeh1jKiia3jGWxSGhOeylo9MSM0pHFzSvFOSqkJ9lHCnDiuhxSk9CnJFSSosOFas8AtpcCoLSgoPaFitK6mwa1WKA+0ih0cecpThlE2kAcR6PJh1dYOvL3B1LzNYOaLACXE1boZOkHQydGgQhZFXOklWRVt0cFYbtcDZTY2ufXS319JmMNRzuF3byb6WVVLOT4KrHynpVSnczHbZ2eKGIX2e6qlQAcjURqbL4e/ceNpO8/q/56/DNrrTRxTpWKhFOcG4a4BvfkTeRYe9hKTDE+Wnxmm2fQvbymGr+t8znppNiYGmqZ6trDUk7hClxQqnLh6GfeM2tvEAbx6QPFov/SRjoSCwH1P5whWPxJREpUzkVldnCHKWKhcqXGoHvE26DheRmeVab145+Bdq7PrIM1SkVB3aEC/IHd8plsYoa5Asw9dP0maXYm0zlQspTPUNN6DZvZsh/X7x0Yb7gDumUe16apUcqbqNQeYte3W26/G0uyT4zzry72K3DYl0bNTdkb/UjFW9Rvk+M2jWqi1Ws7jkzsV9NxhOB2IzsKYBL5VYi4VUDAFcx1N7EG2/XpG7a2DXwjL7UDK3dZSSvhcjfHedKS8absl2WR09viO5YFF5iwbMeliN3PpranCu5thqKqvAldTyOlgJZ9nq61MAhQXyoEK8cyAXXw3eRmN2vi6odc1FqhZ3Ug5gEUNZSq8Lrrm428JEnlrl/GlvhmWT3Vzi8FiKS56lK6j+UgetzDMFTV0z0ms6a28OImq7L1h/DutRy602KZ6i2OXKGyMSTmAv3r6i19QZRVNnolRnoaKSeGhB4Anhyk7zM/F/y3dT2tsBjxVWz2vbUG3gdJgNubKptWdVUITchkAFjfQso0Yc+OuhE1OHRg+nj95ktr7TWlWdn14ADeTczXFl5WP9OzsjNiiQSrjVSQRyI326S4pUghoql7VKHtGuSfe9tVS4HD3UXTpAxXzpVxBABerTpJbULemzu1jxCU1Hi95YbNwBUh3JzZbZTb3bm9r+fqTNJ99Mdep7SskiKw11kbJKTAoEeBJDTiFOIzVWSqkSpJVWAdSnJlSOQQlFgAns4of7OKIPIEqQik+sHp04XSpxRdWmEq2l/hcUBMsrWk9PFES+osbWjiQZYUGmLwuNPOaTZ+KvGni8UyDEGOR5BiXjhUGN8ou22HOSnUA/y3segcCx/uVR5y7R9Y7H0lemyMLhxl668fEb/KPXuFm8vXm/8OosVBsTfwbS/lv9ZqNnAC3lM9jsLUwzZagup7rfoccx/pPT5ywwO2aYtmDDdwBHwnJqV2ZsbClswvZjLVdjow98A+I+MqMB2uwoUBqliOaVfnlj8V20wwHuOWPIJU+ZUCZ8vfjXsk+itoUqdNSEUDnooPwEwmMqK1Q5u4pDP4A6J4mE7Q23Urm1NSik2zNvPRVG8+F4/DbCclFZCCbsEbRyeL1B+nop15y5691F/wAvWV12OVnqNUYe87FiOVzoPITW9rtlfxOGdALuBmT+ocOl9R5ys7K4LI1mtebuph1K+Uz8rba0mZJx5R/hztQK7YaobZ/eS+nvge8viR/424zeVdmgnUAjkQCvxnn/AG37M1KdQ4impAZs3uGxDj3ri24kjN4y17Mf4hoVCY0FWGntVUlW/rRdVbqAQd+kr/b3Ey+PqtphdmootkFhu5X52k9fDC0ZhNq0agvSqo/9DoT5gG4kmIqaSaue0NPDKLGeT9q9j1nrVXpoSoZj5A6kT1MYpFF3dEG+7Mqj1JmA7S9oUYPTotmV7q9VO4EJuy0z+t2BtcaC51vHm69SROpmdtqr2Lh19nRU6/5mJYdXKUqJ/touw/qvylwZBgKDImZ1yM+U5P8AQiqFRPJR6kyW87MzkcGtdprRkcxjbxiFaOCxokixGcqSREnFkqQM5EhVKnIkhtERB32cUKtFDgeI0xC6awKk0PpnSKHXKkHzSes0FLQog7DVNZotmYixmVpPLPCYixjhWN5RrXEixNTSV+AxFxJcQ+kpFR031hma5UeJ/PWVSVNYUlTUHkZRI+0FFXpm+pW1vC+sytDA0nLXQCxG4lefKaraz+4/PKAPMzO4aw14m15zb/2dP8veVns3snRqby48HP1mkwXYDC3941D0zkD/ALbSDs9Umvw1W0wurP105znnxLsrs/hsPrTpKrW71s1T+9rn4yuxeHy4j2qLmW2Vl0BseIlrVxRtYStrVSo6mLXteZxmsPh69DEE039pQJLBWH/VS51APED8tNNtCrXrUbYauKTZgGYqGIXXMFvoG3a6xmBoZ2DNwlphkFrDmfnJ99X64Gw2FtSFJ2epbe7kliedzrKrHdhMNX195GP6kIB8wdDNQiQinKzOI1evOK3+F7j/AC8SpHJ6Rv6q4HwkI/w5xH/20/7W+U9UEa5tNPKsvGf8eZf+3jqPfr0xqBpSqMdeXvrI32BSw9TKSzlbZXe1lPMINPW56z0daoub7ra+cxnaBh7d8u4BR52F5ri232x/rJM+orq7ncdfzhBiYneMLTZyxxzGXiJjbxLSAxymRAxwMAIVpKjQRWkyNAxqNCqTyuR5MlSAWvtYpX+2igHkCNCqdSChJKgkLqR3kUlyXnVpQJxIXhzrI0ow3DUI4Vq52fUsIXiamkGw1KwkzreWzoem2sNptI6VCGJRgRi0g5IO4rl8LytxGx3RGbMCF145iLy+pIBFiUBU59EA1630k6zK0xu59K3YOIsRNthHzCee+yahVKHgbg81O4/nIzW7Jxd7Tj3OV3Y12Ldw6k8pVYnaSghSbcpZ4/E3AUeOkznaDAk5Ta4uD4ERZ+rWb7fpUQM7C53AkDWF4TtZhg2TOpO/3WBIvzmVTCJWy+0C7wNVBIuQD6STA7Lpo91QDXcoVSddbnhpHyNv/Of99PQ8LtKm/cYE8uPpDqbSm2Lgwi3YC51Nr2HIC+thLgLBjqSXkEXtA8XWirYiwlTXxBZrDU8od76iZOe6q9qbadHKIoOgub7ib6W8LespMTis3eFyd543hnaMBKxA3lELDra3/wCZSNUvOrOZlxb1dXlOcyNnnGaRkzRlIcWnM0YTOXiUlDTuaRBp3NEaYNJFeDZo4PAC1eSLUgIePDwAz2kUF9pFAMKKcWWSXnDEDkWEpTgqtCabxgSiCG4ZAIEhhtExwqODRySFY18bTTvOPAan0EaeLGmYQjzOVNvINERmPUhR9ZA22qh7oVfK59T9odivGtf7VQMzEADeToJS7W2urtTRL5PaIWY6AgMOB4cfKURrO5u7lvE6DwG4Rtci3wk2nnPK9IxOCp1RaoL23MNHHgfpAWwL0taZzr4WceX6vL0gPZXaJenkY+8llN95X9B9NP8AbNLRccZGszTXOrmqqhtIMwud001EJUQAgGA4vs+lcZkORxuYbj0YcR8YLgKz0n9nVGVh/aRwZTxE59Y8XTjc0u02ZS4qLziYBA1wBJ0Pxjqa+9J416JpHSPrV8okFSsEGshTDtWN3uqctzHx5COZt9RnrUnuoEL1msm7i3Afcy1w+CWmL7zz4wqjTVBZQABulN2m2r7CizDvmyIP523HwGpPQTfGJHNv+l0xG1K3tsTWYHTPkXl7gC/MH1lc2hsY/C0yo438dfO8dWp33+R4zfjC/Q5eNzyJyRI88QEFpy8jDxZoA/NFmkeaLNEaa8V5EGnc0AlzTuaQ5pzNEYjPFB80UAzgERWNNSIPeBOgSVDIhOEXgfBv8Sq7zfoI1tpt+hQPHUwQL95JTT7w6fjD3rO/fYkctAPQSJ1sBzJtDlpgCRYtVYWJ+8DhtPD2HMziqR1gNOq6GyAuOWpI8DwhgZrAspF9dbfSI+JDUsPy8juT+aTtMdbyZ6OhsPv1jA3s7islcA7nGU+O9fjp/um6pPPNKSN3l7ynMPFTcT0VMQi0jWe+QKH07zZhdUXqdBBNWo2qlBM9Z1RNwZja55KN7HoJT4ztvgKxCMKrC+lQIFCnmCxvy4WnmO2dpVsRWapVBudFTXKq8FXp14nWDUjm03GK8qpLPfXuGASuFzoyVKepVsxViP6SNPUyehtBmB921t7E+4P93HynkGG2xXpoEp1CF320K+hBk7bXxNZSj13ZeIuVXr3bTPwy0n9dSfj2LDLmYMxvyv8APpLijPC9hbRxlJ8uEd3yjMyOc9EL1Ld2/CxB+M9Q7N9p1r2SqopVv9GYMjH+RufQ/GXMyT0zur3talmnnnbrFB6yU11CC51t779eig/3zc4vEBEZz+kEnyE8kr4kvUZ21ZmLEdSdLeAAHlKhVNQexte3y14GTfpPTw3dZXMbm3Mbzz+0lTEWGpOv5rLQZib2zfb8MFbnaF1al0NuB6btOUYqBdWIUc2NvLXf4RAMOkWaJmXMchut9DbT99Y+/MXiHEeadzRzUhwNvHd6yNgRvH2gD807mkV4rxGkzTmaRlpwtEaTNFIs0UDZughYXvYcOsMRdL20+UiwQ91fC/xP1hlZLEHg2vW43j6+sIZmTTrOBR6Rzbo19BGDbQuikGQa/OHUl0+v54QhUJi3K2IM5gHV73F2HPlObS7vKVmExGRw3DcfAxW+znxowco0H/EErsT9vnJi3EfPS0HqCMoZQ3yzvpr9d+7z4ytorY+EsCdNPzXT7eUcFDYR8j/A+B3SzxG0mdkpHREsAo3Ekd4+thyEpWazg7+f1EsHoXfN4D04+kQ4t8fglCh8gZT3lIBHiORmf2zgqSoKlIFTnAIuSLEE8deE3eHQGjZpi+0aBUsOLj4XP0ip5qlote/1lhTU5VWmLu7BVHG9/wDiV9AcLXmt7IYMPXZyBakiW/reoqgf2h4oda3ZmxBh8Pk0B1LsBq77i3hpYDkPGZTaOFZGLLfQ7xvuOIM3m3cTdwi7hfSUeMRbWPGX+M++ww7VVGwz0qwu2Wy1NxI0urdbcZSYYHLfj977vH5R+3FCoqj9bAeQ1P0kVPdvtYb+sIf4kc6EG19PA8ADEFtoTvvcm/5+06o428N/D7kyCo9r6jTf5yiPeqVACAXOnMAdBIRSLHMzFjbe306XiHM3ufgI6nvsLbwD4nh9IjMY23D7fmnxjlbT1520ixtX9C7lNyebDTf03esaptx5E+d/2iCRT9pKrcP+JCGtz+n5vk9/2+n0jCJ6AO42PLh+0GdSu8faFj85xzHz5iLhK8tGloTiMNxTzH2gDG2+TfSolzRSDNFF0+KvZ98oB5m3h+Xlo5zUz/L73pv+F4oo4KGc84x23azsUAmw6+sPUaeeny+kUUqJqt2qdDKlUvFFJ19XPi62fUJXKeHy5SXEIAbcNfPWKKOfC/UdHf8An5xhdzYjz/POdijhVXV+95iHLWIKdbRRSabZPUy0lHSYntE+ZlHR2+AA+sUUKM/VMhAQHmV8d+s2fYnGlarUlAy1Cha4u+ZXULlPLU6HSKKGfo18axnz1nY7luBKXFYvM9uAM5FLqIp9u1b1kX/Sl/Nj9lEdRHA23XPXrFFFDvwq1SwJHHhwG4QMVNbD/n80iijoiVHNvSx433Ex2bKtx3iSBfpva/PWcigCSjpfy66j7iR5tB5j5xRQoh99R5m3QftJ0PAX4+k7FAVIm8+R9ddPWdKcPzl94ooJNeyqzHhrb6fKCVsPnQue+BfpYcPT5TsUKaovFFFM1v/Z',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSEuP5yR-OfKnIa85GTS5Ur4q-Lv_04Hh7Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtLdRRvg-n9LpylbOdQlAj1lB0gkJKCyx8Kg&usqp=CAU'
]

const DUMMY_PRODUCT = () => ({
    name: `Test ${(Math.random() * 100).toFixed(1)}`,
    category_id: Math.random() > 0.5 ? 87 : 88,
    description: '',
    price: (Math.random() * 25).toFixed(2),
    featured: false,
    on_sale: false,
    on_sale_price: '',
    image_url: imageUrls[Math.floor(Math.random() * 3)],
    etsy_url: 'gjiofu',
})

const formRef = ref<HTMLFormElement | null>(null)

const showSuccessToast = ref(false);

// const formValues = ref<Partial<Product>>({
const formValues = ref<Omit<Product, "id">>({
    name: '',
    // category_id: -1,
    category_id: -1,
    description: '',
    price: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
    image_url: '',
    etsy_url: '',
})

const handleSubmit = async (values: any) => {
    values = { ...values, name: values.name.toLowerCase().trim() }
    console.log('Form values:', values)
    try {
        const res = await useCustomFetch('/product', {
            method: 'POST',
            body: values,
        })
        console.log('Create Product Res:', res.data, '\n');
        showSuccessToast.value = true;
        console.log('Show Succes Toast Value:', showSuccessToast.value)

        setTimeout(() => {
            showSuccessToast.value = false;
            console.log('Show Succes Toast Value:', showSuccessToast.value)
        }, 6000)

        reset('product-form') // clears all inputs
    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const saveDummyProduct = async () => {
    const product = DUMMY_PRODUCT();
    console.log('Form values:', product)
    try {
        const res = await useCustomFetch('/product', {
            method: 'POST',
            body: product,
        })
        console.log('Create Product Res:', res.data, '\n');
        showSuccessToast.value = true;
        console.log('Show Succes Toast Value:', showSuccessToast.value)

        setTimeout(() => {
            showSuccessToast.value = false;
            console.log('Show Succes Toast Value:', showSuccessToast.value)
        }, 6000)

        reset('product-form') // clears all inputs
    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const categoryOptions = computed(() => {
    console.log('STORE.CATEGORIES:', store.categories.data);
    if (!store.categories.loading && store.categories.data.length) {
        let options = store.categories.data.map(category => ({
            label: toTitleCase(category.title),
            value: category.id,
        }))
        console.log('CATEGORY OPTIONS:', options);
        return [{ label: 'Select Category', value: -1 }, ...options];
        // return [{ label: 'Select Category', value: -1 }, ...options.slice(1)];
        // return [{ label: 'Select Category', value: -1 }, options];
    }
    return [];
})

const promoOptions = computed(() => {
    console.log('STORE.PROMOTIONS:', store.promotions.data);
    if (!store.promotions.loading && store.promotions.data.length) {
        let options = store.promotions.data.map(promotion => ({
            label: promotion.text,
            value: promotion.id,
        }))
        console.log('PROMO OPTIONS:', options);
        return [{ label: 'Select Promo', value: -1 }, ...options];
    }

    return []
})

const formWrapperClasses = [
    // "border border-red-300",
    "flex flex-col items-center md:flex-row md:items-start md:justify-center",
    "w-full pt-6 md:space-x-6 lg:space-x-12 lg:px-4 xl:px-8"
]
const formClasses = 'flex flex-col w-full space-y-4 max-w-4xl'
const formSectionClasses = [
    "flex flex-col space-y-4",
    "lg:flex-row lg:space-x-4 lg:space-y-0"
]
</script>

<template>
    <div>
        <div :class="formWrapperClasses">
            <Toast :visible="showSuccessToast">Saved</Toast>

            <FormKit v-model="formValues" ref="formRef" :form-class="formClasses" type="form" submit-label="Save"
                id="product-form" @submit="handleSubmit">
                <div :class="formSectionClasses">
                    <FormKit name="name" label="Product Name" type="text" validation="required:trim|length:1,32" />
                    <FormKit name="category_id" label="Category" type="select" :options="categoryOptions"
                        validation="required" />
                </div>

                <div :class="formSectionClasses">
                    <FormKit name="description" label="Description" type="textarea" rows="3" />
                    <FormKit validation="required" name="price" label="Price" type="number" :step="0.01" />
                </div>

                <div class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 lg:space-x-8">
                    <div class="flex space-x-4 lg:space-x-8">
                        <FormKit name="featured" label="Featured?" type="checkbox" />
                        <FormKit name="on_sale" label="On Sale?" type="checkbox" />
                    </div>
                    <FormKit label="Sale Price" name="on_sale_price" type="number" :step="0.01" />
                </div>

                <div :class="formSectionClasses">
                    <FormKit name="promo_id" label="Promotion" type="select" :options="promoOptions"
                        validation="required" />
                </div>

                <div :class="formSectionClasses">
                    <FormKit validation="required" name="image_url" label="Image URL" type="text" />
                    <FormKit validation="required" name="etsy_url" label="Etsy URL" type="text" />
                </div>

                <div class="text-center h-2 relative bottom-2">
                    <FormKitMessages :node="formRef?.node" />
                </div>
            </FormKit>


            <div class="flex flex-col mt-8 md:mt-0 min-w-75">
                <h4 class="text-xl font-medium mb-1 text-center">Preview</h4>
                <ProductCard v-bind="formValues" :preview="true" />
            </div>

        </div>

        <div class="flex justify-center">
            <button class="text-sm py-1 px-2 rounded-md border border-slate-200" @click="saveDummyProduct">+ Dummy
                Product</button>
        </div>
    </div>
</template>