/* -------------------- 람다(lambda) 독립적으로 사용할 프로젝트 파일 -------------------- */



// AWS-SDK 모듈 호출
const AWS = require('aws-sdk');

// Sharp 모듈 호출(이미지 리사이징 패키지 모듈)
const sharp = require('sharp');

// S3 권한 얻기 : 람다 함수가 실행될 때 알아서 설정한 나의 정보를 AWS 에서 돌려준다.
const s3 = new AWS.S3();



// 이미지 리사이징 람다함수
exports.handler = async (event, context, callback) => {

  /* 버킷이름 : react-nodebird-darang */
  const Bucket = event.Records[0].s3.bucket.name;

  /* 리사이징 된 이미지가 저장될 파일이름 : original/20240131_abc.png
     한글 파일이름 깨짐문제 해결을 위해 decodeURIComponent 함수 사용 */
  const Key = decodeURIComponent(event.Records[0].s3.object.key);
  console.log(Bucket, Key);

  /* 파일이름 추출하기 : 20240131_abc.png */
  const filename = Key.split('/')[Key.split('/').length - 1];

  /* 파일 확장자 추출하기
     확장자 스타일을 소문자 통일하기 위해 toLowerCase 함수 사용 */
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase();

  /* 이미지 확장자가 JPG인 경우에는 확장자를 JPEG로 하기 */
  const requiredFormat = ext === 'jpg' ? 'JPEG ' : ext;
  console.log('filename', filename, 'ext', ext);


  try {
    /* getObject : s3로부터 이미지 가져오기 */
    const s3Object = await s3.getObject({ Bucket, Key })
      .promise(); // getObject에서 await을 사용하기 위해 promise 함수 사용
      console.log('original', s3Object.Body.length); // Body에 이미지들이 저장되어 있다.

    /* Sharp를 통한 리사이징 */
    const resizedImage = await sharp(s3Object.Body)
      /* 리사이즈 크기 : 가로 세로 비율을 유지하면서 400x400 정사각형 안에 딱 맞게 설정 */
      .resize(400, 400, { fit: 'inside' })
      /* jpg만 jpeg로 바꾸기, png는 그대로 png 사용하기 */
      .toFormat(requiredFormat)
      /* 리사이징된 결과물이 Buffer로 나온다. */
      .toButter();

    /* putObject : s3로 부터 이미지를 넣기 */
    await s3.putObject({
      Bucket,
      /* 섬네일(thumb) 폴더에 저장하기 : thumb/test.png (크기: 4mb) */
      Key: `thumb/${filename}`,
      Body: resizedImage,
    })
    .promise(); // putObject에서 await을 사용하기 위해 promise 함수 사용
    console.log('put', resizedImage.length);

    /* 에러는 null, 어떤 이미지를 만들어냈는지 알려주기 */
    return callback(null, `thumb/${filename}`);


  } catch (error) {
    console.error(error);
    /* callback으로 람다함수 끝내기(passport의 done과 비슷하다.) */
    return callback(error);
  }
}