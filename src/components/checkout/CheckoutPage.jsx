'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, LoaderCircle, Tag, TriangleAlert } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { createOrder, fetchCountryStates, validateCoupon } from '@/lib/api';

const initialForm = {
	firstname: '',
	lastname: '',
	emailaddress: '',
	phone: '',
	country: '',
	house_number: '',
	apartment: '',
	city: '',
	countrystate_id: '',
	zipcode: '',
	additional_information: '',
};

function toCurrency(value, locale) {
	return new Intl.NumberFormat(locale === 'es' ? 'es-US' : 'en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
	}).format(value);
}

export default function CheckoutPage() {
	const t = useTranslations('CheckoutPage');
	const locale = useLocale();
	const { cart, clearCart } = useCart();

	const [form, setForm] = useState(initialForm);
	const [states, setStates] = useState([]);
	const [couponCode, setCouponCode] = useState('');
	const [appliedCoupon, setAppliedCoupon] = useState(null);
	const [couponError, setCouponError] = useState('');
	const [loadingStates, setLoadingStates] = useState(false);
	const [validatingCoupon, setValidatingCoupon] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		let mounted = true;
		setLoadingStates(true);

		fetchCountryStates()
			.then((payload) => {
				if (mounted) {
					setStates(Array.isArray(payload) ? payload : []);
				}
			})
			.catch(() => {
				if (mounted) {
					setStates([]);
				}
			})
			.finally(() => {
				if (mounted) {
					setLoadingStates(false);
				}
			});

		return () => {
			mounted = false;
		};
	}, []);

	const pricing = useMemo(() => {
		const subtotal = cart.subtotal;
		const discountRate = appliedCoupon?.discount ? Number(appliedCoupon.discount) / 100 : 0;
		const discountAmount = discountRate > 0 ? subtotal * discountRate : 0;
		const total = Math.max(0, subtotal - discountAmount);

		return {
			subtotal,
			discountRate,
			discountAmount,
			total,
		};
	}, [appliedCoupon, cart.subtotal]);

	function onFieldChange(event) {
		const { name, value } = event.target;
		setForm((previous) => ({ ...previous, [name]: value }));
	}

	async function onApplyCoupon() {
		if (!couponCode.trim()) {
			setCouponError(t('couponRequired'));
			return;
		}

		setValidatingCoupon(true);
		setCouponError('');
		setSubmitError('');

		try {
			const payload = await validateCoupon(couponCode);
			setAppliedCoupon(payload);
		} catch (error) {
			setAppliedCoupon(null);
			setCouponError(error.message || t('couponInvalid'));
		} finally {
			setValidatingCoupon(false);
		}
	}

	function onRemoveCoupon() {
		setCouponCode('');
		setCouponError('');
		setAppliedCoupon(null);
	}

	function validateRequiredForm() {
		const requiredFields = [
			'firstname',
			'lastname',
			'emailaddress',
			'phone',
			'country',
			'house_number',
			'city',
			'countrystate_id',
			'zipcode',
		];

		const missing = requiredFields.find((field) => !String(form[field] || '').trim());
		if (missing) {
			return t('requiredField');
		}

		return null;
	}

	async function onSubmitOrder(event) {
		event.preventDefault();
		if (cart.items.length === 0) {
			setSubmitError(t('cartEmpty'));
			return;
		}

		const validationError = validateRequiredForm();
		if (validationError) {
			setSubmitError(validationError);
			return;
		}

		setSubmitting(true);
		setSubmitError('');

		try {
			await createOrder({
				items: cart.items.map((item) => ({
					productId: item.id,
					name: item.name,
					price: Number(item.price) || 0,
					quantity: item.quantity,
					variantId: item.variantId,
					variantLabel: item.variantLabel,
				})),
				totalAmount: pricing.total,
				status: 'PENDING',
				coupon_id: appliedCoupon?.id || null,
				...form,
			});

			setSuccess(true);
			clearCart();
		} catch (error) {
			setSubmitError(error.message || t('submitError'));
		} finally {
			setSubmitting(false);
		}
	}

	if (success) {
		return (
			<main className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_40%,#f7fbff_100%)] px-4 py-12">
				<section className="mx-auto w-full max-w-2xl rounded-[2rem] border border-emerald-200 bg-white p-8 text-center shadow-[0_30px_70px_-52px_rgba(5,20,10,0.45)]">
					<div className="mx-auto inline-flex rounded-full bg-emerald-100 p-3 text-emerald-700">
						<CheckCircle2 className="h-7 w-7" />
					</div>
					<h1 className="font-display mt-4 text-3xl font-black text-[var(--tl-metallic-black)]">{t('successTitle')}</h1>
					<p className="mt-2 text-slate-600">{t('successBody')}</p>
					<div className="mt-6 flex flex-wrap justify-center gap-3">
						<Link
							href="/testing-services"
							className="rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
						>
							{t('continueShopping')}
						</Link>
						<Link
							href="/"
							className="rounded-full border border-sky-200 bg-white px-6 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
						>
							{t('goHome')}
						</Link>
					</div>
				</section>
			</main>
		);
	}

	if (cart.items.length === 0) {
		return (
			<main className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_40%,#f7fbff_100%)] px-4 py-12">
				<section className="mx-auto w-full max-w-2xl rounded-[2rem] border border-sky-100 bg-white p-8 text-center shadow-[0_30px_70px_-52px_rgba(2,6,14,0.7)]">
					<h1 className="font-display text-3xl font-black text-[var(--tl-metallic-black)]">{t('emptyTitle')}</h1>
					<p className="mt-2 text-slate-600">{t('emptyBody')}</p>
					<Link
						href="/testing-services"
						className="mt-6 inline-flex rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
					>
						{t('browseTests')}
					</Link>
				</section>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_40%,#f7fbff_100%)] px-4 py-8 lg:py-12">
			<section className="mx-auto w-full max-w-[1280px]">
				<header className="mb-6">
					<h1 className="font-display text-3xl font-black text-[var(--tl-metallic-black)] lg:text-4xl">{t('title')}</h1>
					<p className="mt-2 text-slate-600">{t('subtitle')}</p>
				</header>

				<div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<form
						onSubmit={onSubmitOrder}
						className="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_22px_50px_-44px_rgba(2,6,14,0.8)] sm:p-6"
					>
						<h2 className="font-display text-xl font-black text-[var(--tl-metallic-black)]">{t('formTitle')}</h2>

						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.firstname')}
								</label>
								<input name="firstname" value={form.firstname} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.lastname')}
								</label>
								<input name="lastname" value={form.lastname} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.emailaddress')}
								</label>
								<input
									name="emailaddress"
									type="email"
									value={form.emailaddress}
									onChange={onFieldChange}
									className="field"
								/>
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.phone')}
								</label>
								<input name="phone" value={form.phone} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.country')}
								</label>
								<input name="country" value={form.country} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.house_number')}
								</label>
								<input name="house_number" value={form.house_number} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.apartment')}
								</label>
								<input name="apartment" value={form.apartment} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.city')}
								</label>
								<input name="city" value={form.city} onChange={onFieldChange} className="field" />
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.countrystate_id')}
								</label>
								<select name="countrystate_id" value={form.countrystate_id} onChange={onFieldChange} className="field">
									<option value="">{loadingStates ? t('loadingStates') : t('selectState')}</option>
									{states.map((entry) => (
										<option key={entry.id} value={entry.id}>
											{entry.name}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.zipcode')}
								</label>
								<input name="zipcode" value={form.zipcode} onChange={onFieldChange} className="field" />
							</div>
							<div className="sm:col-span-2">
								<label className="text-xs font-bold tracking-[0.08em] text-slate-500 uppercase">
									{t('fields.additional_information')}
								</label>
								<textarea
									name="additional_information"
									value={form.additional_information}
									onChange={onFieldChange}
									rows={4}
									className="field resize-y"
								/>
							</div>
						</div>

						{submitError ? (
							<div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
								<TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
								<span>{submitError}</span>
							</div>
						) : null}

						<button
							type="submit"
							disabled={submitting}
							className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)] disabled:cursor-not-allowed disabled:opacity-75"
						>
							{submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
							{submitting ? t('creatingOrder') : t('placeOrder')}
						</button>
					</form>

					<aside className="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_22px_50px_-44px_rgba(2,6,14,0.8)] sm:p-6">
						<h2 className="font-display text-xl font-black text-[var(--tl-metallic-black)]">{t('summaryTitle')}</h2>

						<ul className="mt-4 space-y-3">
							{cart.items.map((item) => (
								<li key={item.key} className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2">
									<p className="text-sm font-bold text-slate-800">{item.name}</p>
									<p className="text-xs text-slate-500">
										{t('qty')}: {item.quantity}
									</p>
									<p className="text-sm font-semibold text-slate-700">
										{toCurrency((item.price || 0) * item.quantity, locale)}
									</p>
								</li>
							))}
						</ul>

						<div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/55 p-4">
							<p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
								<Tag className="h-4 w-4" />
								{t('couponTitle')}
							</p>
							{appliedCoupon ? (
								<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm">
									<p className="font-bold text-emerald-800">
										{appliedCoupon.code} ({appliedCoupon.discount}%)
									</p>
									<button
										type="button"
										onClick={onRemoveCoupon}
										className="mt-1 text-xs font-bold text-emerald-700 underline"
									>
										{t('removeCoupon')}
									</button>
								</div>
							) : (
								<div className="flex gap-2">
									<input
										value={couponCode}
										onChange={(event) => {
											setCouponCode(event.target.value);
											setCouponError('');
										}}
										placeholder={t('couponPlaceholder')}
										className="field min-w-0"
									/>
									<button
										type="button"
										onClick={onApplyCoupon}
										disabled={validatingCoupon}
										className="rounded-full bg-[var(--tl-primary)] px-4 py-2 text-xs font-bold text-white transition hover:bg-[var(--tl-primary-strong)] disabled:opacity-70"
									>
										{validatingCoupon ? t('validatingCoupon') : t('applyCoupon')}
									</button>
								</div>
							)}
							{couponError ? <p className="mt-2 text-xs font-semibold text-rose-700">{couponError}</p> : null}
						</div>

						<div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
							<div className="flex items-center justify-between">
								<span className="text-slate-600">{t('subtotal')}</span>
								<span className="font-semibold text-slate-800">{toCurrency(pricing.subtotal, locale)}</span>
							</div>
							{pricing.discountAmount > 0 ? (
								<div className="flex items-center justify-between">
									<span className="text-slate-600">{t('discount')}</span>
									<span className="font-semibold text-emerald-700">-{toCurrency(pricing.discountAmount, locale)}</span>
								</div>
							) : null}
							<div className="flex items-center justify-between pt-1">
								<span className="font-bold text-slate-800">{t('total')}</span>
								<span className="font-display text-2xl font-black text-[var(--tl-metallic-black)]">
									{toCurrency(pricing.total, locale)}
								</span>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
