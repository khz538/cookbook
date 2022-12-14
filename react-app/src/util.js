

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

// export const isWorkingImage = async url => {
//     const isItImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
//     if (!isItImage) return false;
    // const checkImageRequest = new XMLHttpRequest();
    // try {
    //     checkImageRequest.open('GET', url);
    //     checkImageRequest.send();
    //     checkImageRequest.onerror = () => false;
    //     checkImageRequest.onload = () => {
    //         if (checkImageRequest.status !== 200) return false;
    //     }
    // } catch (e) {
    //     return false;
    // }
    // return true;

// }

export const isImgUrl = async (url) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    })
}

export const imageRegex = url => {
    const regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
    if (!url.match(regex)) return false;
    else {
        return true;
    }
}

export const defaultImage = 'https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg'
