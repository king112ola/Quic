// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library

export const PdfViewer = ({ pdfBase64 }) => {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (

        <div
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '700px',
            }}
        >

            <Viewer theme="dark"
                fileUrl={pdfBase64}
                plugins={[defaultLayoutPluginInstance]} />


        </div>
    )
}

export default PdfViewer
