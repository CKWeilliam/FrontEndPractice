import MCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Card = ({list}) => {

    return (
        <div>
            <h3>Upload History</h3>
            {list.map((history, index) => (
                <MCard key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" color="textSecondary" gutterBottom>
                            Timestamp: {history.timestamp}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Part Number: {history.partNumber}</Typography>
                        <Typography variant="body2" color="text.secondary">Part Type: {history.partType}</Typography>
                        <Typography variant="body2" color="text.secondary">File Category: {history.fileCategory}</Typography>
                        <Typography variant="body2" color="text.secondary">Uploaded Files:</Typography>
                        <ul>
                            {history.files.map((file, fileIndex) => (
                                <li key={fileIndex}>{file.name} - Version: {file.version}</li>
                            ))}
                        </ul>
                    </CardContent>
                </MCard>
            ))}
        </div>
    )
}

export default Card