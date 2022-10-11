function check(event) {
    event.preventDefault();

    const file = event.target.ts.files[0]
    // console.log(file);
    const fd = new FormData(event.target);
    // fd.append('file', file);
    console.log([...fd.values()])
    console.log([...fd.keys()])
    // console.log([...fd.values()])

    // fetch('http://localhost:8080/', {
    //     // headers: {
    //     //     // "Content-type": "multipart/form-data",
    //     //     "Content-Type": "application/x-www-form-urlencoded",
    //     //     // 'Content-Type': 'application/x-www-form-urlencoded',,
    //     // },
    //     method: 'POST',
    //     body: fd,
    // })
}
fetch('http://localhost:8080/images/resume.pdf', {
})
    .then(response => response.blob())
    .then(data => data.text())
    .then(data => {

        if (/\/Font/.test(data)) {
            console.log('Probably native');
        } else {
            console.log('Probably scanned');
        }
    })
// document.getElementById('file').onchange = e => {
//     const file = e.target.files[0]
//     const fl = new FileReader()
//     fl.onload = (e) => {
//         console.log(e.target.result)
//     }
//     fl.readAsBinaryString(file)
// }