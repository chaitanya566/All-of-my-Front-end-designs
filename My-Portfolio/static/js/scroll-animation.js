function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        var headerHeight = document.getElementById('Main-header').offsetHeight;
        section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
}
