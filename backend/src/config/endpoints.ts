import { config } from "./app.config";

const endpoints = {
  v1: {
    AUTH: {
      register: `${config.BASE_URL_VERSION}/auth/register`,
      login: `${config.BASE_URL_VERSION}/auth/login`,
      logout: `${config.BASE_URL_VERSION}/auth/logout`,
      refreshToken: `${config.BASE_URL_VERSION}/auth/refresh-token`,
    },
    USERS: {
      getAllUsers: `${config.BASE_URL_VERSION}/users`,
      getUser: `${config.BASE_URL_VERSION}/users/:id`,
      createUser: `${config.BASE_URL_VERSION}/users`,
      updateUser: `${config.BASE_URL_VERSION}/users/:id`,
      deleteUser: `${config.BASE_URL_VERSION}/users/:id`,
    },
    PROJECTS: {
      getAllProjects: `${config.BASE_URL_VERSION}/projects`,
      getProject: `${config.BASE_URL_VERSION}/projects/:id`,
      createProject: `${config.BASE_URL_VERSION}/projects`,
      updateProject: `${config.BASE_URL_VERSION}/projects/:id`,
      deleteProject: `${config.BASE_URL_VERSION}/projects/:id`,
      assignUsers: `${config.BASE_URL_VERSION}/projects/:id/assign-users`,
      projectUpdates: `${config.BASE_URL_VERSION}/projects/:id/updates`,
    },
    TASKS: {
      getAllTasks: `${config.BASE_URL_VERSION}/tasks`,
      getTask: `${config.BASE_URL_VERSION}/tasks/:id`,
      createTask: `${config.BASE_URL_VERSION}/tasks`,
      updateTask: `${config.BASE_URL_VERSION}/tasks/:id`,
      deleteTask: `${config.BASE_URL_VERSION}/tasks/:id`,
      assignUsers: `${config.BASE_URL_VERSION}/tasks/:id/assign-users`,
      markComplete: `${config.BASE_URL_VERSION}/tasks/:id/complete`,
    },
    RESOURCES: {
      getAllResources: `${config.BASE_URL_VERSION}/resources`,
      getResource: `${config.BASE_URL_VERSION}/resources/:id`,
      createResource: `${config.BASE_URL_VERSION}/resources`,
      updateResource: `${config.BASE_URL_VERSION}/resources/:id`,
      deleteResource: `${config.BASE_URL_VERSION}/resources/:id`,
      trackUsage: `${config.BASE_URL_VERSION}/resources/:id/usage`,
    },
    WORKFORCE: {
      getAllWorkers: `${config.BASE_URL_VERSION}/workforce`,
      getWorker: `${config.BASE_URL_VERSION}/workforce/:id`,
      addWorker: `${config.BASE_URL_VERSION}/workforce`,
      updateWorker: `${config.BASE_URL_VERSION}/workforce/:id`,
      deleteWorker: `${config.BASE_URL_VERSION}/workforce/:id`,
      assignWorker: `${config.BASE_URL_VERSION}/workforce/:id/assign`, // Assign worker to a project or task
      trackAttendance: `${config.BASE_URL_VERSION}/workforce/attendance`, // Track daily attendance
      payroll: `${config.BASE_URL_VERSION}/workforce/payroll`, // Manage worker payroll
    },
    PROCUREMENT: {
      getAllMaterials: `${config.BASE_URL_VERSION}/procurement/materials`,
      getMaterial: `${config.BASE_URL_VERSION}/procurement/materials/:id`,
      addMaterial: `${config.BASE_URL_VERSION}/procurement/materials`,
      updateMaterial: `${config.BASE_URL_VERSION}/procurement/materials/:id`,
      deleteMaterial: `${config.BASE_URL_VERSION}/procurement/materials/:id`,
      trackOrders: `${config.BASE_URL_VERSION}/procurement/orders`, // Track procurement orders
      vendorManagement: `${config.BASE_URL_VERSION}/procurement/vendors`, // Manage vendor information
    },
    SITE_MONITORING: {
      getAllCameras: `${config.BASE_URL_VERSION}/site-monitoring/cameras`,
      getCamera: `${config.BASE_URL_VERSION}/site-monitoring/cameras/:id`,
      addCamera: `${config.BASE_URL_VERSION}/site-monitoring/cameras`,
      updateCamera: `${config.BASE_URL_VERSION}/site-monitoring/cameras/:id`,
      deleteCamera: `${config.BASE_URL_VERSION}/site-monitoring/cameras/:id`,
      liveFeed: `${config.BASE_URL_VERSION}/site-monitoring/cameras/:id/feed`, // WebSocket for live camera feed
      siteReports: `${config.BASE_URL_VERSION}/site-monitoring/reports`, // Generate site monitoring reports
    },
    EQUIPMENT: {
      getAllEquipment: `${config.BASE_URL_VERSION}/equipment`,
      getEquipment: `${config.BASE_URL_VERSION}/equipment/:id`,
      addEquipment: `${config.BASE_URL_VERSION}/equipment`,
      updateEquipment: `${config.BASE_URL_VERSION}/equipment/:id`,
      deleteEquipment: `${config.BASE_URL_VERSION}/equipment/:id`,
      trackUsage: `${config.BASE_URL_VERSION}/equipment/:id/usage`, // Track equipment usage in real-time
      maintenanceSchedule: `${config.BASE_URL_VERSION}/equipment/:id/maintenance`, // Equipment maintenance tracking
    },
    ANALYTICS: {
      dashboard: `${config.BASE_URL_VERSION}/analytics/dashboard`, // Overview dashboard
      projectInsights: `${config.BASE_URL_VERSION}/analytics/projects`, // Project-specific insights
      workforceInsights: `${config.BASE_URL_VERSION}/analytics/workforce`, // Workforce productivity analytics
      financeInsights: `${config.BASE_URL_VERSION}/analytics/finance`, // Financial performance insights
      equipmentInsights: `${config.BASE_URL_VERSION}/analytics/equipment`, // Equipment performance analytics
    },
    COMPLIANCE: {
      getCompliance: `${config.BASE_URL_VERSION}/compliance`,
      updateCompliance: `${config.BASE_URL_VERSION}/compliance/:id`,
      uploadDocuments: `${config.BASE_URL_VERSION}/compliance/documents`, // Upload compliance documents
      checkRegulations: `${config.BASE_URL_VERSION}/compliance/regulations`, // Validate compliance regulations
    },
    NOTIFICATIONS: {
      getAllNotifications: `${config.BASE_URL_VERSION}/notifications`,
      markAsRead: `${config.BASE_URL_VERSION}/notifications/:id/read`,
      deleteNotification: `${config.BASE_URL_VERSION}/notifications/:id`,
      subscribe: `${config.BASE_URL_VERSION}/notifications/subscribe`,
    },
    REAL_TIME: {
      liveProjectUpdates: `${config.BASE_URL_VERSION}/real-time/projects/:id`,
      liveResourceTracking: `${config.BASE_URL_VERSION}/real-time/resources/:id`,
      liveTaskUpdates: `${config.BASE_URL_VERSION}/real-time/tasks/:id`,
      liveEquipmentStatus: `${config.BASE_URL_VERSION}/real-time/equipment/:id`, // WebSocket for equipment status updates
      liveWorkforceTracking: `${config.BASE_URL_VERSION}/real-time/workforce/:id`, // WebSocket for workforce tracking
    },
  },
  v2: {
    // Future features and scalability
  },
};

export default endpoints;
