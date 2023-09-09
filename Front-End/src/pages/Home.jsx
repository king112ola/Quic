import React, { useState } from 'react'


const Home = () => {

  const [VoiceToSpeechComponent, setVoiceToSpeechComponent] = React.useState(() => Loading)
  React.useEffect(() => {
    // @ts-ignore React.lazy's type is wrong
    setVoiceToSpeechComponent(() => React.lazy(() => import('./Voice')))
  }, [])

  return (<React.Suspense fallback={<Loading />}>
    <VoiceToSpeechComponent />
  </React.Suspense>)
}
function Loading() {
  return <div>Loading map...</div>

  
}

export default Home