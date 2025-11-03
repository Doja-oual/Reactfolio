import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EXPERIENCES, GET_COMPETENCES } from '../../services/queries';
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Plus, Edit, Trash2, Save, Briefcase } from 'lucide-react';

const ExperienceManagement = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXPERIENCES);
  const { data: competencesData } = useQuery(GET_COMPETENCES);
  const [createExperience] = useMutation(CREATE_EXPERIENCE);
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE);
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    type: 'CDI',
    description: '',
    competences: [],
    dateDebut: '',
    dateFin: '',
    enCours: false,
    lieu: '',
    logo: '',
    ordre: 0
  });

  const resetForm = () => {
    setFormData({
      entreprise: '',
      poste: '',
      type: 'CDI',
      description: '',
      competences: [],
      dateDebut: '',
      dateFin: '',
      enCours: false,
      lieu: '',
      logo: '',
      ordre: 0
    });
    setEditingExp(null);
  };

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        entreprise: exp.entreprise,
        poste: exp.poste,
        type: exp.type,
        description: exp.description,
        competences: exp.competences?.map(c => c.id) || [],
        dateDebut: exp.dateDebut?.split('T')[0] || '',
        dateFin: exp.dateFin?.split('T')[0] || '',
        enCours: exp.enCours,
        lieu: exp.lieu || '',
        logo: exp.logo || '',
        ordre: exp.ordre || 0
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleCompetenceToggle = (compId) => {
    setFormData(prev => ({
      ...prev,
      competences: prev.competences.includes(compId)
        ? prev.competences.filter(id => id !== compId)
        : [...prev.competences, compId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = {
        entreprise: formData.entreprise,
        poste: formData.poste,
        type: formData.type,
        description: formData.description,
        competences: formData.competences,
        dateDebut: formData.dateDebut,
        dateFin: formData.enCours ? null : formData.dateFin,
        enCours: formData.enCours,
        lieu: formData.lieu,
        logo: formData.logo,
        ordre: parseInt(formData.ordre)
      };

      if (editingExp) {
        await updateExperience({
          variables: { id: editingExp.id, input }
        });
      } else {
        await createExperience({ variables: { input } });
      }

      refetch();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving experience:', err);
      alert('Erreur lors de la sauvegarde de l\'expérience');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience({ variables: { id } });
      refetch();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting experience:', err);
      alert('Erreur lors de la suppression de l\'expérience');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-red-600">Erreur: {error.message}</div>;

  const experiences = data?.getExperiences || [];
  const competences = competencesData?.getCompetences || [];

  const typeLabels = {
    CDI: 'CDI',
    CDD: 'CDD',
    FREELANCE: 'Freelance',
    STAGE: 'Stage',
    ALTERNANCE: 'Alternance'
  };

  const typeColors = {
    CDI: 'bg-green-100 text-green-700',
    CDD: 'bg-blue-100 text-blue-700',
    FREELANCE: 'bg-purple-100 text-purple-700',
    STAGE: 'bg-yellow-100 text-yellow-700',
    ALTERNANCE: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Expériences</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Expérience
          </button>
        </div>

        {/* Experiences List */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {exp.logo && (
                    <img src={exp.logo} alt={exp.entreprise} className="w-16 h-16 object-contain rounded" />
                  )}
                  {!exp.logo && (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.poste}</h3>
                        <p className="text-gray-600">{exp.entreprise} {exp.lieu && `• ${exp.lieu}`}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded ${typeColors[exp.type]}`}>
                        {typeLabels[exp.type]}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(exp.dateDebut).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.enCours ? 'Aujourd\'hui' : new Date(exp.dateFin).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                    </p>

                    <p className="text-gray-700 mb-3">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.competences?.map((comp) => (
                        <span key={comp.id} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {comp.nom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleOpenModal(exp)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(exp)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            Aucune expérience pour le moment. Cliquez sur "Nouvelle Expérience" pour commencer.
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingExp ? 'Modifier l\'expérience' : 'Nouvelle expérience'}>
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
                <input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poste *</label>
                <input
                  type="text"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="STAGE">Stage</option>
                  <option value="ALTERNANCE">Alternance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                <input
                  type="text"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleChange}
                  placeholder="Paris, France"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compétences utilisées</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                {competences.map((comp) => (
                  <label key={comp.id} className="flex items-center gap-2 p-1 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.competences.includes(comp.id)}
                      onChange={() => handleCompetenceToggle(comp.id)}
                      className="rounded"
                    />
                    <span className="text-sm">{comp.nom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début *</label>
                <input
                  type="date"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input
                  type="date"
                  name="dateFin"
                  value={formData.dateFin}
                  onChange={handleChange}
                  disabled={formData.enCours}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="enCours"
                  checked={formData.enCours}
                  onChange={handleChange}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Poste actuel</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo (URL)</label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
                <input
                  type="number"
                  name="ordre"
                  value={formData.ordre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Confirmer la suppression"
        >
          <p className="mb-4">Êtes-vous sûr de vouloir supprimer l'expérience "{deleteConfirm?.poste}" chez {deleteConfirm?.entreprise} ?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => handleDelete(deleteConfirm.id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ExperienceManagement;