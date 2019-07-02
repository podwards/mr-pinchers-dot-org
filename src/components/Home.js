/*
import { API } from "aws-amplify";

class Home extends Component {
  constructor() {
    super();
    this.state = {  data: [] };
  }

  async componentDidMount() {
    const response = await API.get("hello_again", "/hello_again");
    const json = await response;
    console.log(this.state.data)
    this.setState({ data: json[0]["Name"]})
  }

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    )
  }
}
*/


import React, { Component} from 'react'
import { API } from "aws-amplify";
import ReactPlayer from 'react-player'
import AWS from "aws-sdk";
import { STREAM_NAME, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } from '../secrets'

var streamName = STREAM_NAME;

// Step 1: Configure SDK Clients
var options = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION
}
var kinesisVideo = new AWS.KinesisVideo(options);
var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);

const gdepParams = {
  StreamName: streamName,
  APIName: "GET_HLS_STREAMING_SESSION_URL"
}

var playbackMode = 'LIVE';
var fragmentSelectorType = 'SERVER_TIMESTAMP';
const SESSION_EXPIRATION_SECONDS = 60*60

const ghssuParams = {
  StreamName: streamName,
  //StreamARN: "arn:aws:kinesisvideo:us-east-1:635420739373:stream/mr-pinchers-dot-org/1561848963391",
  PlaybackMode: playbackMode,
  HLSFragmentSelector: {
      FragmentSelectorType: fragmentSelectorType,
      TimestampRange: playbackMode === 'LIVE' ? undefined : {
//            StartTimestamp: startTimestamp,
//            EndTimestamp: endTimestamp
      }
  },
  Expires: parseInt(SESSION_EXPIRATION_SECONDS)
}

const gethlsUrl = (async () => {
    const kv_response = await kinesisVideo.getDataEndpoint(gdepParams).promise();
    kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(kv_response.DataEndpoint);
    const hls_response = await kinesisVideoArchivedContent.getHLSStreamingSessionURL(ghssuParams).promise();
    return hls_response
});

class Home extends Component {
  constructor() {
    super();
    this.state = {  data: null };
  }

  async componentDidMount() {
    const response = await gethlsUrl();
    //const json = await response;
    //console.log(this.state.data)
    this.setState({ data: response.HLSStreamingSessionURL})
    console.log(response)
  }

  render() {
    console.log("Here", this.state.data)
    return (
      <div>
        <ReactPlayer url={this.state.data} playing={true} />
      </div>
    )
  }
}


export default Home
