import AWS from 'aws-sdk'
import 'dotenv/config'
import { Buffer } from 'buffer'

function upload(s3: any, uploadParams: any): Promise<any> {
    const saveObject = new Promise((resolve, reject) => {
        s3.upload(uploadParams, function (err: any, data: any) {
            if (err) {
                console.log('Error', err)
                reject('')
            }
            if (data) {
                resolve(data.Location)
            }
        })
    })
    return saveObject
}

// s3Upload関数の使い方
// 第1引数: base64のデータ
// 第2引数: S3で画像を作成する際に画像につけたい名前(拡張子不要)
// 戻り値 : S3で作成された画像のURL(Promise) or ''
export async function s3Upload(
    encodeData: string,
    imgFileName: string
): Promise<String> {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    })

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

    const base64 = encodeData.split(',')

    const isBase64 = base64[0].match(/^data:image+\/\w+;base64$/)
    const extension: String = base64[0].replace(/data:image+\/|;base64/g, '')

    let imgUrl: String = ''

    if (isBase64 && (extension === 'jpeg' || extension === 'png')) {
        const decodeData = Buffer.from(base64[1], 'base64')
        const contentType: String = base64[0].replace(/data:|;base64/g, '')

        const uploadParams = {
            Bucket: 'coffee-clip',
            Key: `${imgFileName}.${extension}`,
            Body: decodeData,
            ContentType: contentType,
        }

        imgUrl = await upload(s3, uploadParams)
    }

    return imgUrl
}
