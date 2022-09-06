

// export const isValidImage = async (urlString, setErrors, error) => {
//     const isItImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlString);
//     if (!isItImage) return false;
//     // if (urlString.indexOf('File:') !== -1) return false;
//     // try {
//     //     await fetch(urlString);
//     // } catch (e) {
//     //     setErrors(error => error.push(['Please use a working image URL']))
//     //     return false;
//     // }
//     // let imageTest = new Image();
//     // imageTest.src = urlString;
//     // imageTest.onerror = function () {
//     //     return false;
//     // };
//     // imageTest.onload = function () {
//     //     if (this.width > 0) {
//     //     } else {
//     //         return false;
//     //     }
//     // };
//     let checkImageRequest = new XMLHttpRequest();
//     try {
//         checkImageRequest.open('GET', urlString, true);
//         checkImageRequest.send();
//         checkImageRequest.onerror = function () {
//             return false;
//         };
//         checkImageRequest.onload = function () {
//             if (checkImageRequest.status !== 200) {
//                 return false;
//             }
//         };
//     } catch (e) {
//         return false;
//     }
//     return true;
// };

export const isWorkingImage = async url => {
    const isItImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    if (!isItImage) return false;
    const checkImageRequest = new XMLHttpRequest();
    try {
        checkImageRequest.open('GET', url);
        checkImageRequest.send();
        checkImageRequest.onerror = () => false;
        checkImageRequest.onload = () => {
            if (checkImageRequest.status !== 200) return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}
