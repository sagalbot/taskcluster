import lazy from '../../utils/lazy';

const WorkerManagerViewWorkerTypes = lazy(() =>
  import(/* webpackChunkName: 'WorkerManager.WorkerManagerViewWorkerTypes' */ './WorkerManagerViewWorkerTypes')
);
const WorkerManagerViewWorkers = lazy(() =>
  import(/* webpackChunkName: 'WorkerManager.WorkerManagerViewWorkerType' */ './WorkerManagerViewWorkers')
);

export default path => [
  {
    component: WorkerManagerViewWorkers,
    path: `${path}/worker-types/:workerType`,
    description: 'View workers for that specific worker type',
  },
  {
    component: WorkerManagerViewWorkers,
    path: `${path}/providers/:provider`,
    description: 'View workers for that specific provider',
  },
  {
    component: WorkerManagerViewWorkerTypes,
    path,
    description:
      'Manage worker types known to the Worker Manager and check on the status of the nodes.',
  },
];
