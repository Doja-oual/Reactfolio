import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJETS, GET_COMPETENCES } from '../../services/queries';
import { CREATE_PROJET, UPDATE_PROJET, DELETE_PROJET } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';

const ProjectsManagement = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROJETS);
  const { data: competencesData } = useQuery(GET_COMPETENCES);
  const [createProjet] = useMutation(CREATE_PROJET);
  const [updateProjet] = useMutation(UPDATE_PROJET);
  const [deleteProjet] = useMutation(DELETE_PROJET);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    descriptionLongue: '',
    technologies: [],
    images: [''],
    lienGithub: '',
    lienDemo: '',
    statut: 'EN_COURS',
    dateDebut: '',
    dateFin: '',
    ordre: 0
  });

  const resetForm = () => {
    setFormData({
      titre: '',
      description: '',
      descriptionLongue: '',
      technologies: [],
      images: [''],
      lienGithub: '',
      lienDemo: '',
      statut: 'EN_COURS',
      dateDebut: '',
      dateFin: '',
      ordre: 0
    });
    setEditingProject(null);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        titre: project.titre,
        description: project.description,
        descriptionLongue: project.descriptionLongue || '',
        technologies: project.technologies?.map(t => t.id) || [],
        images: project.images?.length > 0 ? project.images : [''],
        lienGithub: project.lienGithub || '',
        lienDemo: project.lienDemo || '',
        statut: project.statut,
        dateDebut: project.dateDebut?.split('T')[0] || '',
        dateFin: project.dateFin?.split('T')[0] || '',
        ordre: project.ordre || 0
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

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleTechnologyToggle = (techId) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(techId)
        ? prev.technologies.filter(id => id !== techId)
        : [...prev.technologies, techId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.technologies.length === 0) {
      alert('Veuillez sélectionner au moins une technologie');
      return;
    }

    // Validate dates
    if (formData.dateFin && formData.dateDebut) {
      const debut = new Date(formData.dateDebut);
      const fin = new Date(formData.dateFin);
      if (fin <= debut) {
        alert('La date de fin doit être après la date de début');
        return;
      }
    }

    try {
      const filteredImages = formData.images.filter(img => img && img.trim() !== '');
      
      const input = {
        titre: formData.titre,
        description: formData.description,
        technologies: formData.technologies,
        images: filteredImages,
        statut: formData.statut,
        dateDebut: formData.dateDebut,
        ordre: parseInt(formData.ordre) || 0
      };

      // Only add optional string fields if they have valid values
      if (formData.descriptionLongue && formData.descriptionLongue.trim() !== '') {
        input.descriptionLongue = formData.descriptionLongue;
      }

      if (formData.lienGithub && formData.lienGithub.trim() !== '' && formData.lienGithub.startsWith('http')) {
        input.lienGithub = formData.lienGithub;
      }
      
      if (formData.lienDemo && formData.lienDemo.trim() !== '' && formData.lienDemo.startsWith('http')) {
        input.lienDemo = formData.lienDemo;
      }

      if (formData.dateFin && formData.dateFin.trim() !== '') {
        input.dateFin = formData.dateFin;
      }

      console.log('Submitting project:', input);

      if (editingProject) {
        const result = await updateProjet({
          variables: { id: editingProject.id, input }
        });
        console.log('Update result:', result);
        alert('Projet mis à jour avec succès !');
      } else {
        const result = await createProjet({ variables: { input } });
        console.log('Create result:', result);
        alert('Projet créé avec succès !');
      }

      await refetch();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving project:', err);
      console.error('Error details:', err.graphQLErrors);
      
      // Extract meaningful error message
      let errorMessage = 'Erreur inconnue';
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        errorMessage = err.graphQLErrors[0].message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(`Erreur lors de la sauvegarde du projet: ${errorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProjet({ variables: { id } });
      refetch();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Erreur lors de la suppression du projet');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-red-600">Erreur: {error.message}</div>;

  const projects = data?.getProjets || [];
  const competences = competencesData?.getCompetences || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Projets</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouveau Projet
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {project.images?.[0] && (
                <img
                  src={project.images[0]}
                  alt={project.titre}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.titre}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    project.statut === 'TERMINE' ? 'bg-green-100 text-green-700' :
                    project.statut === 'EN_COURS' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.statut === 'EN_COURS' ? 'En cours' : project.statut === 'TERMINE' ? 'Terminé' : 'Archivé'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span key={tech.id} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tech.nom}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                  {project.lienGithub && (
                    <a href={project.lienGithub} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.lienDemo && (
                    <a href={project.lienDemo} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(project)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucun projet pour le moment. Cliquez sur "Nouveau Projet" pour commencer.
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProject ? 'Modifier le projet' : 'Nouveau projet'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description courte *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description longue</label>
              <textarea
                name="descriptionLongue"
                value={formData.descriptionLongue}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies *</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                {competences.map((tech) => (
                  <label key={tech.id} className="flex items-center gap-2 p-1 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.technologies.includes(tech.id)}
                      onChange={() => handleTechnologyToggle(tech.id)}
                      className="rounded"
                    />
                    <span className="text-sm">{tech.nom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images (URLs)</label>
              {formData.images.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Ajouter une image
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien GitHub</label>
                <input
                  type="url"
                  name="lienGithub"
                  value={formData.lienGithub}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien Démo</label>
                <input
                  type="url"
                  name="lienDemo"
                  value={formData.lienDemo}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EN_COURS">En cours</option>
                  <option value="TERMINE">Terminé</option>
                  <option value="ARCHIVE">Archivé</option>
                </select>
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
          <p className="mb-4">Êtes-vous sûr de vouloir supprimer le projet "{deleteConfirm?.titre}" ?</p>
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

export default ProjectsManagement;