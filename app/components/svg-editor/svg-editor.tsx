'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './svg-editor.module.scss';
import * as svgson from 'svgson';
import { getSvgDataForOptions } from './utils/path-transform';

export type SvgTransformOptions = {
    path: {
        step: number
    }
}

const addDataIds = (node: svgson.INode): svgson.INode => {
    node.attributes['data-broiderer-id'] = `id-${Math.trunc(Math.random() * 10000)}`
    if ((node.children || []).length === 0) {
        return node
    }
    return {...node, children: (node.children).map(child => addDataIds(child) as svgson.INode)}
}

export default function SvgEditor({ svg }: { svg: File }) {
    const [svgData, setSvgData] = useState<svgson.INode | null>(null);
    const [initialSvgData, setInitialSvgData] = useState<svgson.INode | null>(null);
    const [svgTransformOptions, setSvgTransformOptions] = useState<SvgTransformOptions>({path: {step: 5}});

    const svgRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = async () => {
            let parsedSvg = await svgson.parse(await svg.text())
            parsedSvg = addDataIds(parsedSvg)
            setSvgData(parsedSvg);
            setInitialSvgData({...parsedSvg})
        };
        reader.readAsDataURL(svg);
    }, [svg])

    useEffect(() => {
        if (initialSvgData) {
            setSvgData(getSvgDataForOptions(initialSvgData, svgTransformOptions, document))
        }
    }, [svgTransformOptions.path.step])

    const rangeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSvgTransformOptions(prevOptions => (
            {...prevOptions, path: {...prevOptions.path, step: Number(event.target.value)}}
        ))
    }

    return <div className={styles['svg-editor']}>
        <input type="range" min={1} max={20} onChange={rangeChangeHandler}></input>
        <div id="svg-sandbox" dangerouslySetInnerHTML={{__html: svgData ? svgson.stringify(svgData) : ''}}></div>

        <div id="svg-sandbox-hidden" aria-hidden="true" className={styles['hidden-svg']} dangerouslySetInnerHTML={{__html: initialSvgData ? svgson.stringify(initialSvgData) : ''}}></div>
    </div>
}