'use client';

import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignatureField({ label, value, error, onChange, clearLabel = 'Clear Signature' }) {
	const sigPadRef = useRef(null);
	const wrapperRef = useRef(null);
	const [canvasWidth, setCanvasWidth] = useState(750);
	const canvasHeight = 200;

	useEffect(() => {
		if (!wrapperRef.current) {
			return;
		}

		const wrapperEl = wrapperRef.current;

		const updateWidth = () => {
			if (!wrapperEl) {
				return;
			}
			const nextWidth = Math.max(280, Math.floor(wrapperEl.clientWidth || 0));
			setCanvasWidth(nextWidth);
		};

		updateWidth();

		const observer = new ResizeObserver(updateWidth);
		observer.observe(wrapperEl);

		return () => observer.disconnect();
	}, []);

	// Keep old behavior: clear drawn signature when parent resets this field.
	useEffect(() => {
		if (!value && sigPadRef.current && !sigPadRef.current.isEmpty()) {
			sigPadRef.current.clear();
		}
	}, [value]);

	const handleEnd = () => {
		if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
			return;
		}
		onChange(sigPadRef.current.toDataURL('image/png'));
	};

	const clearSignature = () => {
		if (!sigPadRef.current) {
			return;
		}
		sigPadRef.current.clear();
		onChange('');
	};

	return (
		<div className="w-full md:col-span-2">
			<p className="text-sm font-semibold text-slate-700">{label}</p>
			<div
				ref={wrapperRef}
				className={`mt-1 w-full overflow-hidden rounded-xl border-2 bg-white ${
					error ? 'border-rose-500' : 'border-slate-300'
				}`}
			>
				<SignatureCanvas
					ref={sigPadRef}
					penColor="black"
					onEnd={handleEnd}
					canvasProps={{
						width: canvasWidth,
						height: canvasHeight,
						className: 'block touch-none w-full',
					}}
				/>
			</div>
			<div className="mt-2 text-right">
				<button
					type="button"
					onClick={clearSignature}
					className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
				>
					{clearLabel}
				</button>
			</div>
			{error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
		</div>
	);
}
