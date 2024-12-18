export class NodeUpdate {
    static hasChanged(node1, node2) {
        if (node1.nodeType !== node2.nodeType)
            return true;
        if (node1.nodeName !== node2.nodeName)
            return true;
        return (node1.nodeType == Node.TEXT_NODE &&
            node1.textContent !== node2.textContent);
    }
    static updateAttributes(oldNode, newNode) {
        const attrToRm = oldNode
            .getAttributeNames()
            .filter((attr) => newNode.getAttributeNames().indexOf(attr) === -1);
        attrToRm.forEach((attr) => oldNode.removeAttribute(attr));
        for (let i = 0; i < newNode.attributes.length; ++i) {
            if (!oldNode.hasAttribute(newNode.attributes[i].name) ||
                oldNode.getAttribute(newNode.attributes[i].name) !=
                    newNode.attributes[i].value) {
                oldNode.setAttribute(newNode.attributes[i].name, newNode.attributes[i].value);
            }
        }
    }
    static updateChildren(oldNode, newNode) {
        const newNodeLength = newNode.childNodes.length;
        const oldNodeLength = oldNode.childNodes.length;
        const maxLength = Math.max(newNodeLength, oldNodeLength);
        for (let i = 0; i < maxLength; i++) {
            if (i >= oldNodeLength) {
                try {
                    oldNode.appendChild(newNode.childNodes[i].cloneNode(true));
                }
                catch (e) {
                    console.log(e);
                }
            }
            else if (i >= newNodeLength) {
                oldNode.removeChild(oldNode.childNodes[newNodeLength]);
            }
            else {
                const oldChild = oldNode.childNodes[i];
                const newChild = newNode.childNodes[i];
                if (NodeUpdate.hasChanged(oldChild, newChild)) {
                    oldNode.replaceChild(newChild.cloneNode(true), oldChild);
                }
                else {
                    NodeUpdate.updateChildren(oldChild, newChild);
                    if (oldChild instanceof HTMLElement &&
                        newChild instanceof HTMLElement) {
                        NodeUpdate.updateAttributes(oldChild, newChild);
                    }
                }
            }
        }
    }
    /**
     * @deprecated use updateElement() instead
     */
    static updateDiv(id, html) {
        const oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            const newDiv = document.createElement("div");
            newDiv.innerHTML = html;
            NodeUpdate.updateChildren(oldDiv, newDiv);
        }
    }
    static updateElement(id, html) {
        const oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            const newDiv = document.createElement(oldDiv.tagName);
            newDiv.innerHTML = html;
            NodeUpdate.updateChildren(oldDiv, newDiv);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZVVwZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk5vZGVVcGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFVBQVU7SUFDWixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQVcsRUFBRSxLQUFXO1FBQzdDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ25ELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ25ELE9BQU8sQ0FDSCxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2hDLEtBQUssQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLFdBQVcsQ0FDMUMsQ0FBQztJQUNOLENBQUM7SUFFTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBZ0IsRUFBRSxPQUFnQjtRQUM3RCxNQUFNLFFBQVEsR0FBRyxPQUFPO2FBQ25CLGlCQUFpQixFQUFFO2FBQ25CLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ2pELElBQ0ksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqRCxPQUFPLENBQUMsWUFBWSxD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