schema:
{
source: JSON.parse(res.Content).components.schemas.AWSEvent["x-amazon-events-source"]
"detail-type": JSON.parse(res.Content).components.schemas.AWSEvent["x-amazon-events-detail-type"]
}
