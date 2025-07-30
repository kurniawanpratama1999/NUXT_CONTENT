export default async function () {
    const path = useRoute().path
    const {data: project} = await useAsyncData(path, () => queryCollection("content").path(path).first())
    return project
}