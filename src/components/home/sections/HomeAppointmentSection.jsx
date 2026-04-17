import { ArrowRight, Clock3, Mail, MapPin, PhoneCall } from 'lucide-react';

export default function HomeAppointmentSection({ t, appointmentLocations, enableReveal = true }) {
	const sectionRevealProps = enableReveal
		? {
				'data-reveal': true,
				'data-reveal-delay': '170',
			}
		: {};

	const mapRevealProps = enableReveal
		? {
				'data-reveal': true,
				'data-reveal-delay': '190',
			}
		: {};

	return (
		<>
			<section
				id="appointment"
				{...sectionRevealProps}
				className={`${enableReveal ? 'scroll-reveal ' : ''}relative isolate overflow-hidden bg-[linear-gradient(120deg,rgba(7,41,73,0.95),rgba(12,89,151,0.9))] py-16 md:py-24`}
			>
				<div className="relative mx-auto w-full max-w-[1240px] px-4 lg:px-6">
					<div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
						<div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-8">
							<h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">{t('Appointment.title')}</h2>
							<p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100">{t('Appointment.body')}</p>
							<div className="mt-7 space-y-3 text-sm text-blue-50">
								<p className="flex items-start gap-2">
									<MapPin className="mt-0.5 h-4 w-4 shrink-0" />
									{t('Appointment.address')}
								</p>
								<p className="flex items-start gap-2">
									<Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
									{t('Appointment.openAllDay')}
								</p>
								<p className="flex items-start gap-2">
									<PhoneCall className="mt-0.5 h-4 w-4 shrink-0" />
									{t('Appointment.phone')}
								</p>
								<p className="flex items-start gap-2">
									<Mail className="mt-0.5 h-4 w-4 shrink-0" />
									{t('Appointment.email')}
								</p>
							</div>
						</div>

						<form
							className="rounded-3xl border border-white/15 bg-white/95 p-5 shadow-2xl shadow-black/20 sm:p-6"
							onSubmit={(e) => e.preventDefault()}
						>
							<div className="grid gap-4 md:grid-cols-2">
								<label className="text-sm font-semibold text-slate-700">
									{t('Appointment.fields.name.label')}
									<input
										type="text"
										placeholder={t('Appointment.fields.name.placeholder')}
										className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
									/>
								</label>
								<label className="text-sm font-semibold text-slate-700">
									{t('Appointment.fields.email.label')}
									<input
										type="email"
										placeholder={t('Appointment.fields.email.placeholder')}
										className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
									/>
								</label>
								<label className="text-sm font-semibold text-slate-700">
									{t('Appointment.fields.phone.label')}
									<input
										type="tel"
										placeholder={t('Appointment.fields.phone.placeholder')}
										className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
									/>
								</label>
								<label className="text-sm font-semibold text-slate-700">
									{t('Appointment.fields.selectLocation.label')}
									<select className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15">
										{appointmentLocations.map((location) => (
											<option key={location}>{location}</option>
										))}
									</select>
								</label>
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">
									{t('Appointment.fields.date.label')}
									<input
										type="date"
										className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
									/>
								</label>
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">
									{t('Appointment.fields.symptoms.label')}
									<textarea
										rows={5}
										placeholder={t('Appointment.fields.symptoms.placeholder')}
										className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
									/>
								</label>
							</div>

							<div className="mt-5 text-center sm:text-right">
								<button
									type="submit"
									className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[var(--tl-primary-strong)]"
								>
									{t('Appointment.sendRequest')}
									<ArrowRight className="h-4 w-4" />
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			<section
				{...mapRevealProps}
				className={`${enableReveal ? 'scroll-reveal ' : ''}h-[320px] w-full sm:h-[380px] md:h-[450px]`}
			>
				<iframe
					title={t('Appointment.mapTitle')}
					aria-label={t('Appointment.mapAria')}
					src="https://maps.google.com/maps?q=24-7%20Labs%20Memorial%20Hwy&t=m&z=13&output=embed&iwloc=near"
					className="h-full w-full border-0"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</section>
		</>
	);
}
