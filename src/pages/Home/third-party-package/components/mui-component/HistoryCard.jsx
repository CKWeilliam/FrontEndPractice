import MCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const HistoryCard = ({list}) => {

    return (
        <div>
            {/* <h2>Upload History</h2> */}
            {list.map((history, index) => (
                <MCard key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" color="textSecondary" className='text-left' gutterBottom>
                            Timestamp: {history.timestamp}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='text-left'>Part Number: {history.partNumber}</Typography>
                        <Typography variant="body2" color="text.secondary" className='text-left'>Part Type: {history.partType}</Typography>
                        <Typography variant="body2" color="text.secondary" className='text-left'>File Category: {history.fileCategory}</Typography>
                        <Typography variant="body2" color="text.secondary" className='text-left'>Uploaded Files:</Typography>
                        <ul>
                            {history.files.map((file, fileIndex) => (
                                <li key={fileIndex} className='text-left'>{file.name} - Version: {file.version}</li>
                            ))}
                        </ul>
                    </CardContent>
                </MCard>
            ))}
        </div>
    )
}

export default HistoryCard