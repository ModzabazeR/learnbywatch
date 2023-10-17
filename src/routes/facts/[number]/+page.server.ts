export async function load({ params }) {
    const res = await fetch(`http://numbersapi.com/${params.number}`)
    const data = await res.text()
    return {
        body: {
            data
        }
    }
}