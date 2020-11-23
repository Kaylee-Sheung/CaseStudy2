var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyeHmVa7KzDpvMig' }).base('appd7gTpBszYOFdhO');

var loadData = function() {

    base('MyDatabase').select({}).eachPage(function page(records, fetchNextPage) {
        // records.shift();
        console.log(records);
        for (var index = 0; index < records.length; index++) {
            var record = records[index];
            
            console.log('Retrieved ', record.get('Name'));
            console.log(record);

            // 创建 h2 元素
            var titleNode = document.createTextNode(record.get('Title'));
            var h2Node = document.createElement('h2');
            h2Node.appendChild(titleNode);

            // 创建类为 item-cell-text 的 div 元素信息
            var descriptionNode = document.createTextNode(record.get('MainCopy'));
            var pNode = document.createElement('p');
            pNode.appendChild(descriptionNode);
            var itemCellTextNode = document.createElement('div');
            itemCellTextNode.className = 'item-cell-text';
            itemCellTextNode.appendChild(pNode);
            
            itemCellMainNode = document.createElement('div');
            itemCellMainNode.className = 'item-cell-main';
            itemCellMainNode.appendChild(h2Node);
            itemCellMainNode.appendChild(itemCellTextNode);

            // 创建 img 元素
            var imageNode = document.createElement('img');
            var imageUrl = record.get('Gallery')[0].thumbnails.large.url;
            imageNode.src = imageUrl;

            // itemCell a元素
            var itemCell = document.createElement('a');
            itemCell.setAttribute('data-image-url', imageUrl);
            itemCell.className = 'item-cell';
            itemCell.href = 'javascript:void(0);';
            itemCell.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var detailImage = document.getElementById('detail-image');
                var detailImageUrl = this.getAttribute('data-image-url');
                detailImage.src = detailImageUrl;
                var detailView = document.getElementsByClassName('detail-view')[0];
                detailView.style.display = 'block';
                setTimeout(function() {
                    document.body.className = 'iscovered';
                    detailView.style.opacity = 1;
                    return;
                }, 100);
                return false;
            };
            itemCell.appendChild(itemCellMainNode);
            itemCell.appendChild(imageNode);
            
            var itemList = document.getElementsByClassName('item-list')[0];
            itemList.appendChild(itemCell);
        }
        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

loadData();

var initDetailView = function() {
    var detailView = document.getElementsByClassName('detail-view')[0];
    detailView.onclick = function() {
        detailView.style.opacity = 0;
        document.body.className = '';
        setTimeout(function() {
            detailView.style.display = 'none';
            return;
        }, 600);
    };
    return;
};

initDetailView();
