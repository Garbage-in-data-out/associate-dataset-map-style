# associate-dataset-map-style / JavaScript

## Google Cloud Function

### associateDatasetMapStyle
To deploy use:
- gcloud functions deploy associateDatasetMapStyle --runtime nodejs18 --trigger-http --region europe-west1 --project bins-to-owners-332bc

## Short description:
Sets map style to a dataset with a passed by input id.

## Actions (CRUD):
None

##  How to invoke:
URL: https://europe-west1-bins-to-owners-332bc.cloudfunctions.net/associateDatasetMapStyle <br>
Expects POST request with structure:
```
{
    "datasetId": "9dfdce9e-9043-4f63-b3a1-fd7dfb4e88b7"
}
```
