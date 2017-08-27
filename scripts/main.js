var constants = {
  'repoAccessNotice': "To prevent academic integrity violations, access to select repositories are issued temporarily and by request only."
};

$(document).ready(function(){
  $('.private-repo').attr('title', constants.repoAccessNotice);
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
});