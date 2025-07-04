var email = $n.AccountStore.getCurrentAccount().emailAddress;
if (typeof openButton === 'undefined') {

    const openButton = document.getElementById("settings-icon-btn");
    openButton.click();
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.classList?.contains('panel-container')) {

                    const interval = setInterval(() => {
                        const adminPanelItem = node.querySelector('[data-testid="admin_control_panel"]');
                        if (adminPanelItem) {
                            clearInterval(interval);
                            openButton.click();
                            var str = adminPanelItem.textContent.trim()
                            console.log(email + " has " + str)
                        }
                    }
                    , 100);
                    node.style.display = 'none';
                    observer.disconnect();
                }
            }
            );
        }
        );
    }
    );


observer.observe(document.body, {
    childList: true,
    subtree: true
});
}
