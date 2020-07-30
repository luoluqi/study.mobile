

// 默认的 KEY 与 iv 如果没有给
var KEY = CryptoJS.enc.Utf8.parse("fyjysignkey12019");//""中与后台一样  密码
var IV = CryptoJS.enc.Utf8.parse('898d7b5c5bff40fa');//""中与后台一样

/**
 * AES加密 ：字符串 key iv  返回base64
 */
 function Encrypt(word, keyStr, ivStr) {
    var key = KEY
    var iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // console.log("-=-=-=-", encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
 function Decrypt(word, keyStr, ivStr) {
    var key = KEY
    var iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    var base64 = CryptoJS.enc.Base64.parse(word);
    var src = CryptoJS.enc.Base64.stringify(base64);

    var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}