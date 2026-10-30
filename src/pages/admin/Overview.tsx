import { Link } from 'react-router-dom'
import { useAppData } from '../../lib/dataStore'
import { PageHeader, StatusPill } from '../../components/ui'

export default function Overview() {
  const { barangays, clients, forms, submissions, barangayName, formName, clientName } = useAppData()
  const recent = [...submissions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)
  const draftCount = submissions.filter(s => s.status === 'draft').length
  const submittedCount = submissions.filter(s => s.status === 'submitted').length
  const total = submissions.length || 1

  const stats = [
    { label: 'Barangays', value: barangays.length },
    { label: 'Active clients', value: clients.filter(c => c.active).length },
    { label: 'Published forms', value: forms.filter(f => f.published).length },
    { label: 'Submissions', value: submissions.length },
  ]

  return (
    <div>
      <PageHeader title="Overview" subtitle="Municipality of Bulan, Sorsogon — 63 barangays" />
      <div className="p-8 apple-enter">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="material-surface border border-white/80 rounded-app bg-white/74 backdrop-blur-xl p-5 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-[28px] font-semibold tracking-[-0.035em] leading-none">{s.value}</div>
              <div className="mt-1 text-[12.5px] text-ink/50">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-medium">Recent submissions</h2>
              <Link to="/admin/submissions" className="text-[12.5px] text-bottle-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="material-surface overflow-hidden border border-white/80 rounded-app bg-white/74 backdrop-blur-xl divide-y divide-line2 shadow-sm">
              {recent.map(s => (
                <Link
                  key={s.id}
                  to="/admin/submissions"
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-white/80 transition-colors duration-150"
                >
                  <div>
                    <div className="text-[13.5px] font-medium">{formName(s.formId)}</div>
                    <div className="text-[12px] text-ink/50 mt-0.5">
                      {barangayName(s.barangayId)} · {clientName(s.clientId)}
                    </div>
                  </div>
                  <StatusPill status={s.status} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[14px] font-medium mb-3">Submission status</h2>
            <div className="material-surface border border-white/80 rounded-app bg-white/74 backdrop-blur-xl p-5 space-y-4 shadow-sm">
              <div>
                <div className="flex justify-between text-[12.5px] mb-1.5">
                  <span className="text-ink/60">Submitted</span>
                  <span className="font-medium">{submittedCount}</span>
                </div>
                <div className="h-1.5 rounded-full bg-line2 overflow-hidden">
                  <div
                    className="h-full bg-bottle-600"
                    style={{ width: `${(submittedCount / total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[12.5px] mb-1.5">
                  <span className="text-ink/60">Draft</span>
                  <span className="font-medium">{draftCount}</span>
                </div>
                <div className="h-1.5 rounded-full bg-line2 overflow-hidden">
                  <div
                    className="h-full bg-brass-500"
                    style={{ width: `${(draftCount / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
