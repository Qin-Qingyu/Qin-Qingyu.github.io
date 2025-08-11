const a=async ()=>{
    await new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('111')
            resolve()
        },2000)
    })
    console.log(222)
}
a()