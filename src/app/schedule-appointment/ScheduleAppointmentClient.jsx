'use client';

import { useTranslations } from 'next-intl';
import HomeAppointmentSection from '@/components/home/sections/HomeAppointmentSection';

export default function ScheduleAppointmentClient() {
	const t = useTranslations('HomePage');
	const appointmentLocations = t.raw('Appointment.locations');

	return (
		<main className="bg-white">
			<HomeAppointmentSection t={t} appointmentLocations={appointmentLocations} enableReveal={false} />
		</main>
	);
}
