$(document).ready(function() {

  var spaceId = 'hsw9f8j8jgfm';
  var entryId  = '4dR0r6ULV6AgA08ok4yeso';
  var tokenId = '3225c838fb1ff4872fa5c9047907f7144ec130e3b3efaacfc2fda91944eae413';

  var url = getSingleEntryUrl(entryId, spaceId, tokenId);
  $.get(url, popuateResults);

  url = getAllEntriesUrl(spaceId, tokenId);
  $.get(url, popuateResults);

  url = getAllEntriesFromLastMonthUrl(spaceId, tokenId);
  $.get(url, popuateResults);
});

function popuateResults(data) {
  console.log(data);
}

function getSingleEntryUrl(entryId, spaceId, tokenId) {
  return 'https://cdn.contentful.com/spaces/' + spaceId +'/entries/' + entryId + '?access_token=' + tokenId;
}


function getAllEntriesUrl(spaceId, tokenId) {
  return 'https://cdn.contentful.com/spaces/' + spaceId +'/entries?access_token=' + tokenId;
}

function getAllEntriesFromLastMonthUrl(spaceId, tokenId) {
  var today = new Date();
  var fromDate = new Date(today.setMonth(today.getMonth() - 1));
  fromDate = new Date(fromDate.setHours(0,0,0,0));
  var fromDateString= fromDate.toISOString();

  return 'https://cdn.contentful.com/spaces/' + spaceId
      + '/entries?access_token=' + tokenId
      + '&sys.updatedAt%5Bgte%5D=' + fromDateString
      + '&order=sys.updatedAt';
}
