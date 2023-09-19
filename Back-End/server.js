const express = require('express')
require("dotenv").config()
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')
const path = require('path')

// download the image and save to /img
const fs = require('fs')
const https = require('https')
const config = require('./config.json')

// constructing formdata for file upload
var FormData = require('form-data');
// import fetch 
const fetch = require('node-fetch');
const fetchWithRetry = require('node-fetch-retry');

// base64 to blob
const { base64ToBlob, blobToBase64 } = require('base64-blob')

// Defind Localhost Server 
const localServerUrl = "http://localhost:5000"

const contentType = {
  Chatgpt: 'Text',
  SAMSUM: 'Text',
  DALLE2: 'Image',
  DID: 'Video',
  T2SEDEN: 'Audio',
  PDFTRANSEDEN: 'Pdf',
  RIFFUSION: 'AudioPlusImage',
  STABLEDIFFUSION: 'Image',
  OPENJOURNEY: 'Image',
  ANYTHING: 'Image',

}

const Optimum_AI_By_ContentType = {
  "text": "Chatgpt",
  "image": "DALLE2",
  "music": "RIFFUSION",
  "video": "DID",
  "speech": "T2SEDEN",
  "sound": "RIFFUSION"
}

const FronEnd_Accepted_ContentType = {
  "text": "text",
  "image": "image",
  "music": "audio",
  "video": "video",
  "speech": "audio",
  "sound": "audio"
}


const Moralis = require("moralis").default;
let MoralisIpfsList = []

// init moralis
async function initMoralis() {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // serverUrl: process.env.MORALIS_SELF_HOST_SERVER_URL,
  })
}

initMoralis()

const uploadToIpfs_Moralis = async (content, prompt, type) => {
  if (content == "") return // blocking empty case
  let uploadInfo = []

  // add ai contents by type 
  switch (type) {
    case 'Chatgpt':
      uploadInfo.push({
        path: 'message-' + config.lastChatgpt_Text_IDNumber + '.chatgpt' + '.json',
        content: {
          ChatgptMessageOnIpfs: content
        }
      })
      break;

    case 'SAMSUM':
      uploadInfo.push({
        path: 'message-' + config.lastSAMSUM_Text_IDNumber + '.Samsum' + '.json',
        content: {
          SAMSUMMessageOnIpfs: content
        }
      })
      break;

    case 'DALLE2':
      uploadInfo.push({
        path: 'message-' + config.lastDALLE2_Image_IDNumber + '.' + content.split('/')[1],
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })

      break;

    case 'DID':

      uploadInfo.push({
        path: 'message-' + config.lastDID_Video_IDNumber + '.D-ID' + '.mp4',
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })

    case 'T2SEDEN':

      uploadInfo.push({
        path: 'message-' + config.lastT2SEDEN_Audio_IDNumber + '.Text2Speech-EDEN' + '.wav',
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })
      break;
    case 'PDFTRANSEDEN':
      uploadInfo.push({
        path: 'message-' + config.lastPDFTRANSEDEN_Pdf_IDNumber + '.PdfTranslate-EDEN' + '.pdf',
        content: fs.readFileSync('./' + content.pdfPathAfterTrans, { encoding: "base64" })
      })
      break;
    case 'RIFFUSION':
      uploadInfo.push({
        path: 'message-' + config.lastRIFFUSION_AudioPlusImage_IDNumber + '.RIFFUSION' + '.mp3',
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })
      break;

    case 'STABLEDIFFUSION':
      uploadInfo.push({
        path: 'message-' + config.lastSTABLEDIFFUSION_Image_IDNumber + '.' + content.split('/')[1],
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })

      break;
    case 'OPENJOURNEY':
      uploadInfo.push({
        path: 'message-' + config.lastOPENJOURNEY_Image_IDNumber + '.' + content.split('/')[1],
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })

      break;

    case 'ANYTHING':
      uploadInfo.push({
        path: 'message-' + config.lastANYTHING_Image_IDNumber + '.' + content.split('/')[1],
        content: fs.readFileSync('./' + content, { encoding: "base64" })
      })

      break;

    default:
      break;
  }
  // add prompt
  uploadInfo.push({
    path: type + '-' + config['last' + type + '_' + contentType[type] + '_IDNumber'] + '.prompt' + '.json',
    content: {
      promptOnIpfs: prompt
    }
  })

  const responseFromIpfs = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: uploadInfo
  })

  let resultIpfsLinks = responseFromIpfs.jsonResponse.map(element => {

    const pictureFormatConditions = [".bmp", ".png", ".jpg", ".jpeg"];

    switch (true) {
      // chatgpt message body
      case element.path.includes(".chatgpt.json"):
        return { ChatgptMessageOnIpfs: element.path }

      // chatgpt message body
      case element.path.includes(".Samsum.json"):
        return { SAMSUMMessageOnIpfs: element.path }

      // prompt
      case element.path.includes(".prompt.json"):
        return { promptOnIpfs: element.path }

      // All sort of  Image body
      case pictureFormatConditions.some(format => element.path.includes(format)):
        return { imageUrlOnIpfs: element.path }

      // did
      case element.path.includes(".D-ID.mp4"):
        return { videoOnIpfs: element.path }

      // Text to Speech Eden
      case element.path.includes(".Text2Speech-EDEN.wav"):
        return { audioOnIpfs: element.path }

      // Doc pdf translate Eden
      case element.path.includes(".PdfTranslate-EDEN.pdf"):
        return { pdfOnIpfs: element.path }

      // Riffusion, text / image to music
      case element.path.includes(".RIFFUSION.mp3"):
        return { audioOnIpfs: element.path }

      // default to url
      default:
        return { url: element.path }
    }

  })
  let resultIpfsLinksOnCfIPFS = JSON.parse(JSON.stringify(resultIpfsLinks).replaceAll('ipfs.moralis.io:2053', 'cf-ipfs.com'))
  let resultIpfsLinksCloudFlareIPFS = JSON.parse(JSON.stringify(resultIpfsLinks).replaceAll('ipfs.moralis.io:2053', 'cloudflare-ipfs.com'))
  let resultIpfsLinksDwebLinkIPFS = JSON.parse(JSON.stringify(resultIpfsLinks).replaceAll('ipfs.moralis.io:2053', 'dweb.link'))
  return resultIpfsLinksDwebLinkIPFS
}


// 


// download function for getting image form url
const downloadDALLE2Image = (url, dest, cb) => {

  // update last image number
  config.lastDALLE2_Image_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  // update the dest image number
  dest = dest + "-" + config.lastDALLE2_Image_IDNumber + '.jpg'

  let file = fs.createWriteStream(dest);
  let request = https
    .get(url, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close(cb(dest));
      });
    })
    // .on('finish', () => cb(dest))
    .on('error', function (err) {
      fs.unlink(dest); // Delete the file async if there is an error
      if (cb) cb(err.message);
    });

  request.on('error', function (err) {
    
  });

};

const downloadDIDVideo = (url, dest, cb) => {

  // update last image number
  config.lastDID_Video_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  // update the dest image number
  dest = dest + "-" + config.lastDID_Video_IDNumber + '.mp4'

  let file = fs.createWriteStream(dest);
  let request = https
    .get(url, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close(cb(dest));
      });
    })
    // .on('finish', () => cb(dest))
    .on('error', function (err) {
      fs.unlink(dest); // Delete the file async if there is an error
      if (cb) cb(err.message);
    });

  request.on('error', function (err) {
    
  });

};

// Download Audio from the Edeb AI
const downloadT2SEDENAudio = (url, dest, cb) => {

  // update the dest image number
  dest = dest + "-" + config.lastT2SEDEN_Audio_IDNumber + '.wav'

  let file = fs.createWriteStream(dest);
  let request = https
    .get(url, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close(cb(dest));
      });
    })
    // .on('finish', () => cb(dest))
    .on('error', function (err) {
      fs.unlink(dest); // Delete the file async if there is an error
      if (cb) cb(err.message);
    });

  request.on('error', function (err) {
    
  });

};


// dotenv.config()

// set up open Ai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// set up Hugging Face
const HuggingFaceApiKey = process.env.HUGGINGFACE_API_KEY

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello!'
  })
})

// handeling request to stsable deffision 
app.post('/api/v1/STABLEDIFFUSION', async (req, res) => {
  config.lastSTABLEDIFFUSION_Image_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  const prompt = req.body.prompt;

  const createImageFromSTABLEDIFFUSION = async (data) => {
    // const prompt = req.body.prompt;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { Authorization: "Bearer " + process.env.HUGGINGFACE_API_KEY },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const buffer = Buffer.from(await result.arrayBuffer());


    if (result === undefined)
      return await createImageFromSTABLEDIFFUSION({ "inputs": prompt })

    let returnPath = 'img/' + 'STABLEDIFFUSION-' + config.lastSTABLEDIFFUSION_Image_IDNumber + '.jpg'

    fs.writeFileSync(returnPath, buffer, () => { });
    return returnPath
  }

  try {

    let STABLEDIFFUSIONResponseImagePath = await createImageFromSTABLEDIFFUSION({ "inputs": prompt })

    let uploadedIpfsMessage = await uploadToIpfs_Moralis(STABLEDIFFUSIONResponseImagePath, prompt, 'STABLEDIFFUSION')

    res.status(200).send(uploadedIpfsMessage);

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in SAMSUM end point');
  }
})

// handeling request to openjourney
app.post('/api/v1/OPENJOURNEY', async (req, res) => {


  config.lastOPENJOURNEY_Image_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  const prompt = req.body.prompt;

  const createImageFromOPENJOURNEY = async (data) => {

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        headers: { Authorization: "Bearer " + process.env.HUGGINGFACE_API_KEY },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const buffer = Buffer.from(await result.arrayBuffer());


    if (result === undefined)
      return await createImageFromOPENJOURNEY({ "inputs": prompt })

    let returnPath = 'img/' + 'OPENJOURNEY-' + config.lastOPENJOURNEY_Image_IDNumber + '.jpg'

    fs.writeFileSync(returnPath, buffer, () => { });
    return returnPath
  }

  try {

    let STABLEDIFFUSIONResponseImagePath = await createImageFromOPENJOURNEY({ "inputs": prompt })

    let uploadedIpfsMessage = await uploadToIpfs_Moralis(STABLEDIFFUSIONResponseImagePath, prompt, 'OPENJOURNEY')
    res.status(200).send(uploadedIpfsMessage);

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in SAMSUM end point');
  }
})

// handeling request to anything AI model
app.post('/api/v1/ANYTHING', async (req, res) => {

  config.lastANYTHING_Image_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  const prompt = req.body.prompt;

  const createImageFromANYTHING = async (data) => {

    const response = await fetch(
      "https://api-inference.huggingface.co/models/andite/anything-v4.0",
      {
        headers: { Authorization: "Bearer " + process.env.HUGGINGFACE_API_KEY },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const buffer = Buffer.from(await result.arrayBuffer());


    if (result === undefined)
      return await createImageFromANYTHING({ "inputs": prompt })

    let returnPath = 'img/' + 'ANYTHING-' + config.lastANYTHING_Image_IDNumber + '.jpg'

    fs.writeFileSync(returnPath, buffer, () => { });
    return returnPath
  }

  try {

    let STABLEDIFFUSIONResponseImagePath = await createImageFromANYTHING({ "inputs": prompt })

    let uploadedIpfsMessage = await uploadToIpfs_Moralis(STABLEDIFFUSIONResponseImagePath, prompt, 'ANYTHING')
    res.status(200).send(uploadedIpfsMessage);

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in SAMSUM end point');
  }
})


// handleing Eden Ai PDF Translation api call
app.post('/api/v1/RIFFUSION', async (req, res) => {

  // update last image number
  config.lastRIFFUSION_AudioPlusImage_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  let startPrompt
  let endPrompt

  if (req.body.prompt) {
    startPrompt = req.body.prompt
    endPrompt = req.body.prompt
  }
  else {
    startPrompt = req.body.start
    endPrompt = req.body.end
  }

  // fetch session from the local riffision interface api
  //////////////////////////////////////

  let request = {
    "alpha": 0.75,
    "num_inference_steps": 500,
    "seed_image_id": "og_beat",

    "start": {
      "prompt": JSON.stringify(startPrompt),
      "seed": 42,
      "denoising": 0.75,
      "guidance": 7.0
    },

    "end": {
      "prompt": endPrompt === '' ? JSON.stringify(startPrompt) : JSON.stringify(endPrompt),
      "seed": 12,
      "denoising": 0.75,
      "guidance": 7.0
    }
  }



  const response = await fetch(process.env.RIFFUSION_API_URL, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "620",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  }).catch((error) => {
    console.error("Error:", error);
  });

  let responseJson = (await response.json())

  const { image, audio } = responseJson
  // 
  // writing the received image + audio locally 

  let audioPath = 'audio/RIFFUSION-' + config.lastRIFFUSION_AudioPlusImage_IDNumber + '.mp3'
  let imagePath = 'img/RIFFUSION-' + config.lastRIFFUSION_AudioPlusImage_IDNumber + '.jpg'

  fs.writeFileSync(audioPath, audio, { encoding: 'base64' }, function (err) {
  });

  fs.writeFileSync(imagePath, image.split(';base64,').pop(), { encoding: 'base64' }, function (err) {
  });

  // 

  let uploadedIpfsMessage = await uploadToIpfs_Moralis(audioPath, "start" + startPrompt + ";end" + endPrompt, 'RIFFUSION')

  // 

  res.status(200).send(uploadedIpfsMessage);


})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Handleing API call///////////////////////////////////////////////////////////////

// handleing Eden Ai PDF Translation api call
app.post('/api/v1/PDFTRANSEDEN', async (req, res) => {

  const uploadedPdfInBase64 = req.body.uploadedPdf

  const preferredLanguage = req.body.preferredLanguage

  // store and add the number for the doc files
  config.lastPDFTRANSEDEN_Pdf_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  // save the doc locally , tmply
  const createPDFTRANSFromEden = async () => {
    let base64image = uploadedPdfInBase64.split(';base64,').pop();
    let pdfPath = 'pdf/' + 'PDFTRANSEDEN-' + config.lastPDFTRANSEDEN_Pdf_IDNumber + '.pdf'
    fs.writeFile(pdfPath, base64image, { encoding: 'base64' }, function (err) {
    });

    const fd = new FormData();

    fd.append('file', fs.createReadStream(pdfPath))
    fd.append("providers", "google");

    fd.append("source_language", "auto-detect");
    fd.append("target_language", preferredLanguage);

    // Buffer.from(uploadedPdfInBase64)

    const url = 'https://api.edenai.run/v2/translation/document_translation';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + fd.getBoundary(),
        authorization: 'Bearer ' + process.env.EDENAI_API_KEY,
      },
      body: fd
    };

    let resFromEden = await fetch(url, options).catch(err => console.error('error:' + err));
    let resFromEdenJson = (await resFromEden.json()).google.file

    // save the translated doc locally 
    let resFromEdenJsonBase64 = resFromEdenJson.split(';base64,').pop();
    let pdfPathAfterTrans = 'pdf/' + 'PDFTRANSEDEN-' + config.lastPDFTRANSEDEN_Pdf_IDNumber + '-Translated-' + preferredLanguage + '-' + '.pdf'
    fs.writeFileSync(pdfPathAfterTrans, resFromEdenJsonBase64, { encoding: 'base64' }, function (err) {
    });

    let PDFTRANSResult = {}
    PDFTRANSResult['pdfPathAfterTrans'] = pdfPathAfterTrans
    PDFTRANSResult['resFromEdenJson'] = resFromEdenJson

    return PDFTRANSResult
  }

  let PDFTRANSResult = await createPDFTRANSFromEden()

  let uploadedIpfsMessage = await uploadToIpfs_Moralis(PDFTRANSResult, uploadedPdfInBase64, 'PDFTRANSEDEN')
  uploadedIpfsMessage.push({ messageBodyInBase64: 'data:application/pdf;base64,' + PDFTRANSResult.resFromEdenJson })
  res.status(200).send(uploadedIpfsMessage);


})


// handleing Eden Ai Text To Speech api call
app.post('/api/v1/T2SEDEN', async (req, res) => {

  // store and add the number if the chatgot message
  config.lastT2SEDEN_Audio_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  const prompt = req.body.prompt;

  const createTextToSpeechFromEden = async (provider) => {
    // Requesting the Eden Ai
    const url = 'https://api.edenai.run/v2/audio/text_to_speech';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer ' + process.env.EDENAI_API_KEY
      },
      body: JSON.stringify({
        response_as_dict: true,
        attributes_as_list: false,
        show_original_response: false,
        providers: provider,
        text: prompt,
        language: 'en',
        option: 'FEMALE'
      })
    };


    let res = await fetch(url, options).catch(err => console.error('error:' + err));

    let resJson = await res.json()

    if (resJson[provider].status === 'fail')
      return await createTextToSpeechFromEden('google')


    let T2SEDENAudio_resource_url = resJson[provider].audio_resource_url
    return T2SEDENAudio_resource_url


  }

  try {

    let T2SEDENAudio_resource_url = await createTextToSpeechFromEden('lovoai')

    downloadT2SEDENAudio(T2SEDENAudio_resource_url, 'audio/T2SEDEN', function (callbacks) {
      uploadToIpfs_Moralis(callbacks, prompt, 'T2SEDEN').then((element) => {
        res.status(200).send(element)

      }
      )

    })

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in SAMSUM end point');
  }


})


// handleing SAMSUM api call
app.post('/api/v1/SAMSUM', async (req, res) => {

  // store and add the number if the chatgot message
  config.lastSAMSUM_Text_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  const prompt = req.body.prompt;

  const createSummeryFromSAMSUM = async () => {
    // const prompt = req.body.prompt;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/philschmid/bart-large-cnn-samsum",
      {
        headers: { Authorization: "Bearer " + process.env.HUGGINGFACE_API_KEY },
        method: "POST",
        body: JSON.stringify(prompt),
      }
    );
    const result = await response.json();

    if (result[0] === undefined)
      return await createSummeryFromSAMSUM()
    else
      return result[0].summary_text.trim()
  }

  try {

    let SAMSUMResponseText = await createSummeryFromSAMSUM()

    let uploadedIpfsMessage = await uploadToIpfs_Moralis(SAMSUMResponseText, prompt, 'SAMSUM')
    uploadedIpfsMessage.push({ messageBodyInText: SAMSUMResponseText })
    res.status(200).send(uploadedIpfsMessage);

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in SAMSUM end point');
  }


})


// handleing DID api call
app.post('/api/v1/DID', async (req, res) => {

  const prompt = req.body.prompt;

  const createVideoFromDID = async () => {

    const url = 'https://api.d-id.com/talks';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ' + process.env.DID_API_KEY,
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          provider: { type: 'microsoft', voice_id: 'Jenny' },
          ssml: 'false',
          input: prompt
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url: 'https://imgtr.ee/images/2023/03/10/o49QD.jpg'
      })
    };

    let res = await fetch(url, options).catch(err => console.error('error:' + err));
    let videoID = (await res.json()).id
    return videoID
  }

  const getVideoFromDID = async (videoID) => {

    const url = 'https://api.d-id.com/talks/' + videoID;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + process.env.DID_API_KEY,
      },
      retry: 40,
      pause: 1000
    };

    let res = await fetchWithRetry(url, options).catch(err => console.error('error:' + err));
    let resInJson = await res.json()
    let status = resInJson.status



    if (status !== "done")
      return await getVideoFromDID(videoID)

    else {
      let videoUrl = resInJson.result_url
      return videoUrl
    }


  }


  try {
    let videoID = await createVideoFromDID()
    let videoUrl = await getVideoFromDID(videoID)

    downloadDIDVideo(videoUrl, 'video/DID', function (callbacks) {

      uploadToIpfs_Moralis(callbacks, prompt, 'DID').then((element) => {

        res.status(200).send(element)

      }
      )

    })

  } catch (error) {
    console.error("Error Happened On DID:")
    console.error(error)
  }

})

// handleing DID api call
app.post('/api/v1/DID_V2/VideoGeneratedWebhook/:chatID', async (req, res) => {

  const chatID = req.params['chatID']
  
  const result_url = req.body.result_url

  let chatEngineRes = await fetch(`https://api.chatengine.io/chats/${chatID}/messages/`,
  {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "Project-ID": process.env.CHAT_PROJECT_ID,
      "User-Name": process.env.DATONG_AI_CHAT_USER_NAME,
      "User-Secret": process.env.DATONG_AI_CHAT_USER_SECRET,
    },
    body: JSON.stringify({ "text": "","attachment_urls": [result_url], }),
  })

  // let resJson = await chatEngineRes.json()

  res.status(200).end();
})

// handleing DID api call
app.post('/api/v1/DID_V2', async (req, res) => {

  //   process.env.SELF_EXPOSED_URL

  const DIDConfig = req.body.DIDConfig;

  const createVideoFromDID = async () => {

    const url = 'https://api.d-id.com/talks';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ' + process.env.DID_API_KEY,
      },
      body: JSON.stringify(DIDConfig)
    };

    let res = await fetch(url, options).catch(err => console.error('error:' + err));
  }


  try {
    await createVideoFromDID()
    res.status(200).end();
  } catch (error) {
    console.error("Error Happened On DID:")
    console.error(error)
  }

})

// handleing QuicAI api call
app.post('/api/v1/QuicAI', async (req, res) => {

  function classify_requested_content_type(requested_content_type) {
    const selectedAIEngine = Optimum_AI_By_ContentType[requested_content_type]
    return selectedAIEngine;
  }

  AI_API_Functions_Filtering = [
    {
      name: "classify_requested_content_type",
      description: "get the the requested content type from an user input",
      parameters: {
        type: "object",
        properties: {
          requested_content_type: { "type": "string", "enum": ["text", "image", "music", "video", "speech", "sound"] }
        },
        required: ["requested_content_type"],
      },
    }
  ]

  try {
    const prompt = req.body.prompt;
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",

      messages: [{ "role": "user", "content": prompt }],

      functions: AI_API_Functions_Filtering,
      function_call: { "name": "classify_requested_content_type" },
    }
    )
    const Chatgpt_Function_Calling_Response_Message = response.data["choices"][0]["message"]
    const requested_content_type = JSON.parse(Chatgpt_Function_Calling_Response_Message['function_call']['arguments'])["requested_content_type"]
    const selectedAIEngine = eval(Chatgpt_Function_Calling_Response_Message.function_call.name + `("${requested_content_type}")`)

    // self calling existing AI Api Endpoint from local Server 
    const selectedAIEngineResponse = await fetch(localServerUrl + '/api/v1/' + selectedAIEngine, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "620",
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    // sending QuicAI Dynamic AI Response back to user
    const selectedAIEngineResponseJson = await selectedAIEngineResponse.json()

    // append content type to response for front end to identify dynamice AI request
    selectedAIEngineResponseJson.push({ contentType: FronEnd_Accepted_ContentType[requested_content_type] })

    // append dynamic Selected AiEngine to response for front end to identify dynamice AI request
    selectedAIEngineResponseJson.push({ dynamicSelectedAiEngine: selectedAIEngine })

    res.status(200).send(selectedAIEngineResponseJson)

  }
  catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in QuicAI end point.');
  }

  config.lastQuciAI_Any_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  res.end()
})

// handleing chatgpt api call
app.post('/api/v1/Chatgpt', async (req, res) => {
  try{
    if(!req.body.prompt)
    {
      console.log("Empty prompt1");
      res.status(500).send(error || 'Something went wrong in prompt.');
    }
  }catch(error){
    console.log("Empty prompt2");    
  }
  // update last message number
  // model for "gpt - 3.5 - turbo"

  // store and add the number if the chatgot message
  config.lastChatgpt_Text_IDNumber += 1
  fs.writeFileSync('config.json', JSON.stringify(config));

  try {
    const prompt = req.body.prompt;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 1000,
    })


    // model for "text-davinci-003"

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `${prompt}`,
    //   temperature: 0, // Higher values means the model will take more risks.
    //   max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
    //   top_p: 1, // alternative to sampling with temperature, called nucleus sampling
    //   frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    //   presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    // });


    let uploadedIpfsMessage = await uploadToIpfs_Moralis(response.data.choices[0].message.content.trim(), prompt, 'Chatgpt')

    uploadedIpfsMessage.push({ messageBodyInText: response.data.choices[0].message.content.trim() })

    res.status(200).send(uploadedIpfsMessage);

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong in Chatgpt end point.');
  }


})

// handle DALL·E 2 api call
app.post('/api/v1/DALLE2', async (req, res) => {

  try {
    const prompt = req.body.prompt;
    const numberOfImages = req.body.numberOfImages;
    const imageSize = req.body.imageSize;

    const imageParameters = {
      prompt: prompt,
      n: numberOfImages, // max is 4
      size: imageSize, // max is 1024x1024
    }

    const response = await openai.createImage(imageParameters);
    // 
    let url = response.data.data.map(element => element.url)

    // for each url, because we could have more than one photo, and return image location locally
    let imagesLocation = url.map((eachUrl) => {

      let location = downloadDALLE2Image(eachUrl, 'img/DALLE2', function (callbacks) {
        // example callbacks = img/DALLE2-30.jpg
        // uploadToIpfs_Moralis(callbacks);
        uploadToIpfs_Moralis(callbacks, prompt, 'DALLE2').then((element) => {

          // just a quic switch for better performance , will be removed
          element[0].imageUrlOnIpfs = url[0]

          res.status(200).send(element)

        }
        )


      })
      return location
    })

  } catch (error) {
    //  console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on ' + localServerUrl))

