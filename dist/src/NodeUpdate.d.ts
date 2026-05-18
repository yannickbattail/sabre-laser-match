export declare class NodeUpdate {
    static hasChanged(node1: Node, node2: Node): boolean;
    static updateAttributes(oldNode: Element, newNode: Element): void;
    static updateChildren(oldNode: Node, newNode: Node): void;
    /**
     * @deprecated use updateElement() instead
     */
    static updateDiv(id: string, html: string): void;
    static updateElement(id: string, html: string): void;
}
