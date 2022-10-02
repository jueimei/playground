// global variables
const base_url = "https://word-space-exploration.azurewebsites.net/"
const search_engine_extension = "searchEngine"
const document_metadata_extension = "documentMetadata/"
// const multiple_document_metadata_extension = "documentMultipleMetadata"
const tag_recommender_extension = "tagRecommender"
var saved_query = ""
var document_list = ""

function searchClicked() {
    var query = document.getElementById("search").value;
    searchEngineQuery(query)
    tagRecommenderQuery(query)
}



/*
  Below are all the APIs
*/

// API Async function - documentMetadata
const getDocument = async (document_id) => {
    const response = await fetch(base_url + document_metadata_extension + document_id);
    const myJson = await response.json();
    console.log(myJson)
  }

// API Async function - searchEngine
const searchEngineQuery = async (query) => {
  payload = `{"query": "` + query + `"}`
  const response = await fetch(base_url + search_engine_extension, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json();
  console.log("Search Engine Query Result")
  console.log(myJson)
}

// API Async function - tag
const tagRecommenderQuery = async (query) => {
  payload = `{"query": "` + query + `"}`
  const response = await fetch(base_url + tag_recommender_extension, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json();
  console.log("Tag Recommender Query Result")
  console.log(myJson)
}

// TODO - API Async function - Retrieve Multiple Documents
// const retriveMultipleDocuments = async (document_id_list) => {
//   payload = {"documentList": document_id_list }
//   console.log(payload)
//   console.log(JSON.stringify(payload))
//   const response = await fetch(base_url + multiple_document_metadata_extension, {
//     method: 'POST',
//     body: JSON.stringify(payload),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const test = await response;
//   console.log("Retrieve Multiple Documents Result")
//   console.log(test)
// }