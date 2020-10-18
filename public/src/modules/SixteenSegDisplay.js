import CircuitElement from '../circuitElement';
import Node, { findNode } from '../node';
import simulationArea from '../simulationArea';
import {
    correctWidth, lineTo, moveTo, rect,
} from '../canvasApi';
import { changeInputSize } from '../modules';
/**
 * @class
 * SixteenSegDisplay
 * @extends CircuitElement
 * @param {number} x - x coordinate of element.
 * @param {number} y - y coordinate of element.
 * @param {Scope=} scope - Cirucit on which element is drawn
 * @category modules
 */
export default class SixteenSegDisplay extends CircuitElement {
    constructor(x, y, scope = globalScope) {
        super(x, y, scope, 'RIGHT', 16);
        /* this is done in this.baseSetup() now
        this.scope['SixteenSegDisplay'].push(this);
        */
        this.fixedBitWidth = true;
        this.directionFixed = true;
        this.setDimensions(30, 50);
        this.input1 = new Node(0, -50, 0, this, 16);
        this.dot = new Node(0, 50, 0, this, 1);
        this.direction = 'RIGHT';
    }

    /**
     * @memberof SixteenSegDisplay
     * fn to create save Json Data of object
     * @return {JSON}
     */
    customSave() {
        const data = {
            nodes: {
                input1: findNode(this.input1),
                dot: findNode(this.dot),
            },
        };
        return data;
    }

    /**
     * @memberof SixteenSegDisplay
     * function to draw element
     */
    customDrawSegment(x1, y1, x2, y2, color) {
        if (color === undefined) color = 'lightgrey';
        var ctx = simulationArea.context;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = correctWidth(4);
        const xx = this.x;
        const yy = this.y;
        moveTo(ctx, x1, y1, xx, yy, this.direction);
        lineTo(ctx, x2, y2, xx, yy, this.direction);
        ctx.closePath();
        ctx.stroke();
    }

    /**
     * @memberof SixteenSegDisplay
     * function to draw element
     */
    customDrawSegmentSlant(x1, y1, x2, y2, color) {
        if (color === undefined) color = 'lightgrey';
        var ctx = simulationArea.context;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = correctWidth(3);
        const xx = this.x;
        const yy = this.y;
        moveTo(ctx, x1, y1, xx, yy, this.direction);
        lineTo(ctx, x2, y2, xx, yy, this.direction);
        ctx.closePath();
        ctx.stroke();
    }

    /**
     * @memberof SixteenSegDisplay
     * function to draw element
     */
    customDraw() {
        var ctx = simulationArea.context;
        const xx = this.x;
        const yy = this.y;
        const color = ['lightgrey', 'red'];
        const { value } = this.input1;
        this.customDrawSegment(-20, -38, 0, -38, ['lightgrey', 'red'][(value >> 15) & 1]);// a1
        this.customDrawSegment(20, -38, 0, -38, ['lightgrey', 'red'][(value >> 14) & 1]);// a2
        this.customDrawSegment(21.5, -2, 21.5, -36, ['lightgrey', 'red'][(value >> 13) & 1]);// b
        this.customDrawSegment(21.5, 2, 21.5, 36, ['lightgrey', 'red'][(value >> 12) & 1]);// c
        this.customDrawSegment(-20, 38, 0, 38, ['lightgrey', 'red'][(value >> 11) & 1]);// d1
        this.customDrawSegment(20, 38, 0, 38, ['lightgrey', 'red'][(value >> 10) & 1]);// d2
        this.customDrawSegment(-21.5, 2, -21.5, 36, ['lightgrey', 'red'][(value >> 9) & 1]);// e
        this.customDrawSegment(-21.5, -36, -21.5, -2, ['lightgrey', 'red'][(value >> 8) & 1]);// f
        this.customDrawSegment(-20, 0, 0, 0, ['lightgrey', 'red'][(value >> 7) & 1]);// g1
        this.customDrawSegment(20, 0, 0, 0, ['lightgrey', 'red'][(value >> 6) & 1]);// g2
        this.customDrawSegmentSlant(0, 0, -21, -37, ['lightgrey', 'red'][(value >> 5) & 1]);// h
        this.customDrawSegment(0, -2, 0, -36, ['lightgrey', 'red'][(value >> 4) & 1]);// i
        this.customDrawSegmentSlant(0, 0, 21, -37, ['lightgrey', 'red'][(value >> 3) & 1]);// j
        this.customDrawSegmentSlant(0, 0, 21, 37, ['lightgrey', 'red'][(value >> 2) & 1]);// k
        this.customDrawSegment(0, 2, 0, 36, ['lightgrey', 'red'][(value >> 1) & 1]);// l
        this.customDrawSegmentSlant(0, 0, -21, 37, ['lightgrey', 'red'][(value >> 0) & 1]);// m
        ctx.beginPath();
        const dotColor = ['lightgrey', 'red'][this.dot.value] || 'lightgrey';
        ctx.strokeStyle = dotColor;
        rect(ctx, xx + 22, yy + 42, 2, 2);
        ctx.stroke();
    }

    subcircuitDrawSegment(x1, y1, x2, y2, color) {
        if (color == undefined) color = "lightgrey";
        ctx = simulationArea.context;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = correctWidth(3);
        xx = this.subcircuitMetadata.x;
        yy = this.subcircuitMetadata.y;
        moveTo(ctx, x1, y1, xx, yy, this.direction);
        lineTo(ctx, x2, y2, xx, yy, this.direction);
        ctx.closePath();
        ctx.stroke();
    }

    subcircuitDrawSegmentSlant(x1, y1, x2, y2, color) {
        if (color == undefined) color = "lightgrey";
        ctx = simulationArea.context;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = correctWidth(2);
        xx = this.subcircuitMetadata.x;
        yy = this.subcircuitMetadata.y;
        moveTo(ctx, x1, y1, xx, yy, this.direction);
        lineTo(ctx, x2, y2, xx, yy, this.direction);
        ctx.closePath();
        ctx.stroke();
    }

    // Draws the element in the subcircuit. Used in layout mode
    subcircuitDraw() {
        ctx = simulationArea.context;

        var xx = this.subcircuitMetadata.x;
        var yy = this.subcircuitMetadata.y;

        var color = ["lightgrey", "red"];
        var value = this.input1.value;

        this.layoutDrawSegment(-10, -38, 0, -38, ["lightgrey", "red"][(value >> 15) & 1]);      //a1
        this.layoutDrawSegment(10, -38, 0, -38, ["lightgrey", "red"][(value >> 14) & 1]);       //a2    
        this.layoutDrawSegment(11.5, -19, 11.5, -36, ["lightgrey", "red"][(value >> 13) & 1]);  //b
        this.layoutDrawSegment(11.5, 2, 11.5, -15, ["lightgrey", "red"][(value >> 12) & 1]);        //c
        this.layoutDrawSegment(-10, 4, 0, 4, ["lightgrey", "red"][(value >> 11) & 1]);      //d1
        this.layoutDrawSegment(10, 4, 0, 4, ["lightgrey", "red"][(value >> 10) & 1]);           //d2
        this.layoutDrawSegment(-11.5, 2, -11.5, -15, ["lightgrey", "red"][(value >> 9) & 1]);   //e
        this.layoutDrawSegment(-11.5, -36, -11.5, -19, ["lightgrey", "red"][(value >> 8) & 1]); //f
        this.layoutDrawSegment(-10, -17, 0, -17, ["lightgrey", "red"][(value >> 7) & 1]);           //g1
        this.layoutDrawSegment(10, -17, 0, -17, ["lightgrey", "red"][(value >> 6) & 1]);            //g2
        this.layoutDrawSegmentSlant(0, -17, -9, -36, ["lightgrey", "red"][(value >> 5) & 1]);   //h
        this.layoutDrawSegment(0, -36, 0, -19, ["lightgrey", "red"][(value >> 4) & 1]);         //i
        this.layoutDrawSegmentSlant(0, -17, 9, -36, ["lightgrey", "red"][(value >> 3) & 1]);        //j
        this.layoutDrawSegmentSlant(0, -17, 9, 0, ["lightgrey", "red"][(value >> 2) & 1]);      //k
        this.layoutDrawSegment(0, -17, 0, 2, ["lightgrey", "red"][(value >> 1) & 1]);           //l
        this.layoutDrawSegmentSlant(0, -17, -9, 0, ["lightgrey", "red"][(value >> 0) & 1]);     //m

        ctx.beginPath();
        var dotColor = ["lightgrey", "red"][this.dot.value] || "lightgrey"
        ctx.strokeStyle = dotColor;
        rect(ctx, xx + 13, yy + 5, 1, 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = correctWidth(1);
        rect2(ctx, -15, -42, 33, 51, xx, yy, this.direction);
        ctx.stroke();
    }
}

/**
 * @memberof SixteenSegDisplay
 * Help Tip
 * @type {string}
 * @category modules
 */
SixteenSegDisplay.prototype.tooltipText = 'Sixteen Display ToolTip: Consists of 16+1 bit inputs.';

/**
 * @memberof SixteenSegDisplay
 * Help URL
 * @type {string}
 * @category modules
 */
SixteenSegDisplay.prototype.helplink = 'https://docs.circuitverse.org/#/outputs?id=sixteen-segment-display';
SixteenSegDisplay.prototype.objectType = 'SixteenSegDisplay';
SixteenSegDisplay.prototype.canShowInSubcircuit = true;
SixteenSegDisplay.prototype.layoutProperties = {
    rightDimensionX : 20,
    leftDimensionX : 15,
    upDimensionY : 42,
    downDimensionY: 10
}

