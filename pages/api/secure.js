import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
console.log(publicRuntimeConfig.secretKey);

/**
 *  private static String sign(String data, String secretKey) {
            UTF8Encoding encoding = new System.Text.UTF8Encoding();
            byte[] keyByte = encoding.GetBytes(secretKey);

            HMACSHA256 hmacsha256 = new HMACSHA256(keyByte);
            byte[] messageBytes = encoding.GetBytes(data);
            return Convert.ToBase64String(hmacsha256.ComputeHash(messageBytes));
        }
 * 
*/
 
function sign(data )  {
    var crypto = require('crypto');

    let crypted = crypto.createHmac('sha256', publicRuntimeConfig.secretKey).update(data).digest("base64");

    return crypted;
    //return sign(buildDataToSign(paramsArray), SECRET_KEY);
}

/*
function signArray(arr )  {
    var crypto = require('crypto');

    let crypted = crypto.createHmac('sha256', publicRuntimeConfig.secretKey).update(data).digest("base64");

    return crypted;
    //return sign(buildDataToSign(paramsArray), SECRET_KEY);
}
for (const id of todoIdList) {
private static String sign(String data, String secretKey) {
    UTF8Encoding encoding = new System.Text.UTF8Encoding();
    byte[] keyByte = encoding.GetBytes(secretKey);

    HMACSHA256 hmacsha256 = new HMACSHA256(keyByte);
    byte[] messageBytes = encoding.GetBytes(data);
    return Convert.ToBase64String(hmacsha256.ComputeHash(messageBytes));
}

private static String buildDataToSign(IDictionary<string,string> paramsArray) {
    String[] signedFieldNames = paramsArray["signed_field_names"].Split(',');
    IList<string> dataToSign = new List<string>();

    foreach (String signedFieldName in signedFieldNames)
    {
         dataToSign.Add(signedFieldName + "=" + paramsArray[signedFieldName]);
    }

    return commaSeparate(dataToSign);
}

private static String commaSeparate(IList<string> dataToSign) {
    return String.Join(",", dataToSign);                         
}*/