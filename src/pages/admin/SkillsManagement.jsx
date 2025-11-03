import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPETENCES } from '../../services/queries';
import { CREATE_COMPETENCE, UPDATE_COMPETENCE, DELETE_COMPETENCE } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

const SkillsManagement = () => {
  const { loading, error, data, refetch } = useQuery(GET_COMPETENCES);
  const [createCompetence] = useMutation(CREATE_COMPETENCE);
  const [updateCompetence] = useMutation(UPDATE_COMPETENCE);
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
    niveau: 'INTERMEDIAIRE',
    categorie: 'FRONTEND',
    pourcentage: 50,
    icone: ''
  });

  const resetForm = () => {
    setFormData({
      nom: '',
      niveau: 'INTERMEDIAIRE',
      categorie: 'FRONTEND',
      pourcentage: 50,
      icone: ''
    });
    setEditingSkill(null);
  };

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        nom: skill.nom,
        niveau: skill.niveau,
        categorie: skill.categorie,
        pourcentage: skill.pourcentage || 50,
        icone: skill.icone || ''
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = {
        nom: formData.nom,
        niveau: formData.niveau,
        categorie: formData.categorie,
        pourcentage: parseInt(formData.pourcentage),
        icone: formData.icone
      };

      if (editingSkill) {
        await updateCompetence({
          variables: { id: editingSkill.id, input }
        });
      } else {
        await createCompetence({ variables: { input } });
      }

      refetch();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving skill:', err);
      alert('Erreur lors de la sauvegarde de la compétence');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompetence({ variables: { id } });
      refetch();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting skill:', err);
      alert('Erreur lors de la suppression de la compétence');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-red-600">Erreur: {error.message}</div>;

  const skills = data?.getCompetences || [];
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.categorie]) acc[skill.categorie] = [];
    acc[skill.categorie].push(skill);
    return acc;
  }, {});

  const categoryLabels = {
    FRONTEND: 'Frontend',
    BACKEND: 'Backend',
    DATABASE: 'Base de données',
    DEVOPS: 'DevOps',
    AUTRE: 'Autre'
  };

  const niveauLabels = {
    DEBUTANT: 'Débutant',
    INTERMEDIAIRE: 'Intermédiaire',
    AVANCE: 'Avancé',
    EXPERT: 'Expert'
  };

  const niveauColors = {
    DEBUTANT: 'bg-gray-100 text-gray-700',
    INTERMEDIAIRE: 'bg-blue-100 text-blue-700',
    AVANCE: 'bg-green-100 text-green-700',
    EXPERT: 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Compétences</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Compétence
          </button>
        </div>

        {/* Skills by Category */}
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{categoryLabels[category]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{skill.nom}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${niveauColors[skill.niveau]}`}>
                        {niveauLabels[skill.niveau]}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Niveau</span>
                        <span>{skill.pourcentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${skill.pourcentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(skill)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded text-sm transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(skill)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            Aucune compétence pour le moment. Cliquez sur "Nouvelle Compétence" pour commencer.
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingSkill ? 'Modifier la compétence' : 'Nouvelle compétence'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FRONTEND">Frontend</option>
                <option value="BACKEND">Backend</option>
                <option value="DATABASE">Base de données</option>
                <option value="DEVOPS">DevOps</option>
                <option value="AUTRE">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau *</label>
              <select
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="DEBUTANT">Débutant</option>
                <option value="INTERMEDIAIRE">Intermédiaire</option>
                <option value="AVANCE">Avancé</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pourcentage de maîtrise ({formData.pourcentage}%)
              </label>
              <input
                type="range"
                name="pourcentage"
                min="0"
                max="100"
                value={formData.pourcentage}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icône (URL)</label>
              <input
                type="url"
                name="icone"
                value={formData.icone}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
          <p className="mb-4">Êtes-vous sûr de vouloir supprimer la compétence "{deleteConfirm?.nom}" ?</p>
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

export default SkillsManagement;