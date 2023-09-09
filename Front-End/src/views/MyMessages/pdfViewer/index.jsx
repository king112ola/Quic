// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import { themePlugin } from '@react-pdf-viewer/theme';



export const PdfViewer = ({ pdfBase64 }) => {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const themePluginInstance = themePlugin();



    return (
        <>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '700px',
                }}
            >

                <Viewer theme="dark"
                    fileUrl={pdfBase64}
                    plugins={[defaultLayoutPluginInstance, themePluginInstance]} />


            </div>

        </>
    )
}

export default PdfViewer
