// global variables
const base_url = "https://word-space-exploration.azurewebsites.net/"
const ntrs_base_url = "https://ntrs.nasa.gov/api/"
const ntrs_api_extension = "citations/"
// const base_url = "http://127.0.0.1:5000/"
const search_engine_extension = "searchEngine"
const document_metadata_extension = "documentMetadata/"
const tag_recommender_extension = "tagRecommender"
var saved_query = ""
var document_list = ""

function searchClicked() {
  var query = document.getElementById("search").value;
  saved_query = query;
  document.getElementById("tagResult").innerHTML = "";
  document.getElementById("documentResults").innerHTML = "";
  tagRecommenderQuery(query);
  searchEngineQuery(query);
}


/*
  Below are all the APIs
*/

// API Async function - documentMetadata
const getDocumentFromNTRS = async (document_id) => {
    var response = await fetch(ntrs_base_url + ntrs_api_extension + document_id, {
      method: 'GET',
      mode: 'cors'
    });
    var myJson = await response.json();
    console.log(myJson)
  }

// API Async function - tag
const tagRecommenderQuery = async (query) => {
  payload = `{"query": "` + query + `"}`
  const response = await fetch(base_url + tag_recommender_extension, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':base_url,
      'Access-Control-Allow-Credentials': 'true'
    }
  });
  const myJson = await response.json();
  const tag_list = myJson.tagsRecommended
  const query_list = query.split(" ")
  const final_tag_list = []

  for(let tag = 0; tag < tag_list.length -1; tag++){
     if (!query_list.includes(tag_list[tag])){
      final_tag_list.push(tag_list[tag])
     }
  }
  for(let i = 0; i < final_tag_list.length; i++){
    var btn = document.createElement("button");
    btn.className = "btn";
    var button_id = "tag"+i;
    btn.setAttribute("id", button_id);
    var text_node = document.createTextNode(final_tag_list[i]);  
    btn.appendChild(text_node);
    document.getElementById('tagResult').appendChild(btn);
    btn.onmousedown = function(event){
      // text extracted from the mouse click
      button_text = event.path[0].textContent;
      saved_query = saved_query + " " + button_text;
      document.getElementById("search").value = saved_query;
      searchClicked();
    };
  }
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
  document_list = myJson.documentList;

  for(let i = 0; i < document_list.length; i++){
    var docDiv = document.createElement("div");
    docDiv.className= "docDiv"
    var doc_index = "docIndex"+i;
    docDiv.setAttribute("id", doc_index);
    var text_node = document.createTextNode(document_list[i]);       
    docDiv.appendChild(text_node);
    document.getElementById('documentResults').appendChild(docDiv);
  }
}
